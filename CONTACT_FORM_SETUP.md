# Contact Form Setup Guide

## 🚀 Quick Start Options

### Option 1: EmailJS (Frontend Only - Easiest)
**Best for**: Quick setup, no backend needed
**Cost**: Free tier available

1. **Install EmailJS**:
   ```bash
   npm install @emailjs/browser
   ```

2. **Sign up at [EmailJS.com](https://www.emailjs.com/)**
3. **Create an email service** (Gmail, Outlook, etc.)
4. **Create an email template**
5. **Get your credentials**:
   - Service ID
   - Template ID
   - Public Key

6. **Update the contact form** with your credentials

### Option 2: Backend API Route (Recommended)
**Best for**: Professional setup, better security, database storage
**Cost**: Free (uses your own email)

## 🔧 Backend Setup (Option 2)

### 1. Install Dependencies
```bash
npm install nodemailer
npm install @types/nodemailer --save-dev
```

### 2. Environment Variables
Create a `.env.local` file in your project root:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# For Gmail, you need an "App Password":
# 1. Enable 2-factor authentication
# 2. Go to Google Account > Security > App passwords
# 3. Generate a new app password for "Mail"
```

### 3. Gmail App Password Setup
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled
4. Go to **App passwords**
5. Select **Mail** and **Other (Custom name)**
6. Generate the password and use it in `EMAIL_PASS`

### 4. Alternative Email Services

#### Outlook/Hotmail
```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

#### Yahoo
```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

#### Custom SMTP
```env
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-password
```

## 🗄️ Database Setup (Optional)

### MongoDB (Recommended for beginners)
1. **Install MongoDB driver**:
   ```bash
   npm install mongodb
   ```

2. **Set up MongoDB Atlas** (free cloud database):
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free account
   - Create new cluster
   - Get connection string

3. **Add to environment**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your-database
   ```

4. **Update the API route** to use MongoDB

### PostgreSQL
1. **Install PostgreSQL driver**:
   ```bash
   npm install pg
   npm install @types/pg --save-dev
   ```

2. **Set up database**:
   ```sql
   CREATE TABLE contacts (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(255) NOT NULL,
     subject VARCHAR(200) NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Add to environment**:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/your-database
   ```

## 📧 Email Templates

### Admin Notification Email
The system automatically sends you a formatted email with:
- Sender's name and email
- Subject line
- Full message content
- Timestamp

### User Confirmation Email
Users automatically receive:
- Thank you message
- Copy of their message
- Expected response time
- Your contact information

## 🛡️ Security Features

### Built-in Protection
- ✅ Input validation
- ✅ Email format validation
- ✅ Rate limiting (can be added)
- ✅ CSRF protection (Next.js built-in)
- ✅ XSS prevention

### Additional Security (Optional)
```typescript
// Add rate limiting
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
})
```

## 🧪 Testing

### 1. Test the Form
1. Fill out the contact form
2. Submit and check for success message
3. Check your email for the notification
4. Check the user's email for confirmation

### 2. Test Error Handling
1. Try submitting with missing fields
2. Try invalid email format
3. Check error messages display correctly

### 3. Check Console Logs
- Look for any errors in browser console
- Check server logs for API errors

## 🚨 Troubleshooting

### Common Issues

#### "Email not sending"
- Check environment variables
- Verify email credentials
- Check spam folder
- Ensure 2FA is enabled for Gmail

#### "Form not submitting"
- Check browser console for errors
- Verify API route is working
- Check network tab for failed requests

#### "Database connection failed"
- Verify connection string
- Check database is running
- Verify credentials

### Debug Steps
1. **Check environment variables** are loaded
2. **Test email credentials** manually
3. **Check API route** responds correctly
4. **Verify database connection** (if using)

## 📱 Mobile Optimization

The contact form is already mobile-responsive with:
- ✅ Responsive grid layout
- ✅ Touch-friendly inputs
- ✅ Mobile-optimized buttons
- ✅ Proper viewport settings

## 🔄 Maintenance

### Regular Tasks
- **Weekly**: Check email delivery
- **Monthly**: Review form submissions
- **Quarterly**: Update email templates
- **Annually**: Review security settings

### Monitoring
- Set up email delivery monitoring
- Track form submission success rates
- Monitor for spam submissions
- Check database performance

## 💰 Cost Breakdown

### Free Options
- ✅ EmailJS (100 emails/month free)
- ✅ Gmail/Outlook (free with limits)
- ✅ MongoDB Atlas (free tier)
- ✅ Vercel hosting (free tier)

### Paid Options
- **EmailJS Pro**: $15/month (1,000 emails)
- **SendGrid**: $15/month (50,000 emails)
- **Mailgun**: $35/month (50,000 emails)
- **Professional email hosting**: $5-20/month

## 🎯 Next Steps

1. **Choose your preferred option** (EmailJS or Backend)
2. **Set up email credentials**
3. **Test the form thoroughly**
4. **Monitor for spam** and set up filters
5. **Consider adding** reCAPTCHA for extra security

---

**Need help?** Check the console logs and ensure all environment variables are set correctly!
