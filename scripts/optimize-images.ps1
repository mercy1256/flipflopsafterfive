# Downsize + re-encode photos. Pass -Path to target specific files/folders:
#   .\scripts\optimize-images.ps1 -Path public\images\vietnam\articles\tu-san-canyon.jpg
# With no -Path it does every UNTRACKED image, which is only safe on a fresh photo drop --
# re-running it over files it already processed re-encodes them and loses quality each time.
param([string[]]$Path)

Add-Type -AssemblyName System.Drawing

$Repo    = "c:\Users\Urvish Shah\Desktop\projects\Blog\flipflopsafterfive"
$Backup  = "c:\Users\Urvish Shah\Desktop\projects\Blog-image-originals-2026-08-01"
$MaxEdge = 2400
$Quality = 82

# JPEG encoder + quality param
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality)

# Build the file list: -Path if given, otherwise every untracked image (a fresh photo drop)
$targets = if ($Path) { $Path } else {
    (git -C $Repo status --short) |
        Where-Object { $_.StartsWith('??') } |   # NB: -like '??*' would wildcard-match every line
        ForEach-Object { $_.Substring(3).Trim() }
}

$files = @()
foreach ($rel in $targets) {
    $full = if ([System.IO.Path]::IsPathRooted($rel)) { $rel } else { Join-Path $Repo $rel }
    if (-not (Test-Path $full)) { continue }
    if (Test-Path $full -PathType Container) {
        $files += Get-ChildItem $full -Recurse -File | Where-Object { $_.Extension -match '^\.(jpg|jpeg|png)$' }
    } elseif ($full -match '\.(jpg|jpeg|png)$') {
        $files += Get-Item $full
    }
}

$before = 0; $after = 0; $changed = 0; $skipped = 0
foreach ($f in $files) {
    $origBytes = $f.Length
    $before += $origBytes

    $img = [System.Drawing.Image]::FromFile($f.FullName)
    try {
        # EXIF orientation (0x0112) -- apply it, since re-encoding drops the tag
        $rotate = [System.Drawing.RotateFlipType]::RotateNoneFlipNone
        if ($img.PropertyIdList -contains 0x0112) {
            switch ($img.GetPropertyItem(0x0112).Value[0]) {
                3 { $rotate = [System.Drawing.RotateFlipType]::Rotate180FlipNone }
                6 { $rotate = [System.Drawing.RotateFlipType]::Rotate90FlipNone }
                8 { $rotate = [System.Drawing.RotateFlipType]::Rotate270FlipNone }
            }
        }
        if ($rotate -ne [System.Drawing.RotateFlipType]::RotateNoneFlipNone) { $img.RotateFlip($rotate) }

        $w = $img.Width; $h = $img.Height
        $scale = [math]::Min(1.0, $MaxEdge / [math]::Max($w, $h))
        $nw = [int][math]::Round($w * $scale)
        $nh = [int][math]::Round($h * $scale)

        $bmp = New-Object System.Drawing.Bitmap($nw, $nh, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.CompositingMode    = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $nw, $nh)))
        $g.Dispose()

        $tmp = "$($f.FullName).opt.tmp"
        $bmp.Save($tmp, $codec, $encParams)
        $bmp.Dispose()
    } finally {
        $img.Dispose()
    }

    $newBytes = (Get-Item $tmp).Length
    if ($newBytes -lt $origBytes) {
        # .png that shrank still gets JPEG bytes -- keep the original extension only for .jpg/.jpeg
        Move-Item $tmp $f.FullName -Force -Confirm:$false
        $after += $newBytes
        $changed++
        "{0,7:N0} -> {1,6:N0} KB  {2}x{3}  {4}" -f ($origBytes/1KB), ($newBytes/1KB), $nw, $nh, $f.FullName.Substring($Repo.Length + 15)
    } else {
        Remove-Item $tmp -Force -Confirm:$false
        $after += $origBytes
        $skipped++
    }
}

""
"changed: $changed   left alone (already smaller): $skipped"
"total before: {0:N1} MB    after: {1:N1} MB    saved: {2:N1} MB ({3:N0}%)" -f ($before/1MB), ($after/1MB), (($before-$after)/1MB), ((1 - $after/$before) * 100)
