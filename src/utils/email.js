import nodemailer from 'nodemailer';

/**
 * Email service configuration and utilities
 * Supports multiple SMTP providers with fallback options
 */

// Singleton transporter instance (cached for performance)
let transporterInstance = null;

/**
 * Creates and caches a reusable transporter object
 * @returns {Object|null} - Nodemailer transporter or null if no config
 */
const createTransporter = () => {
  // Return cached instance if available
  if (transporterInstance) {
    return transporterInstance;
  }
  
  // Check for custom SMTP configuration
  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    transporterInstance = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
    });
    return transporterInstance;
  }
  
  // Fallback: Gmail configuration (requires app password)
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporterInstance = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    return transporterInstance;
  }
  
  // No configuration available
  return null;
};

/**
 * Verifies SMTP connection
 * @returns {Promise<boolean>} - True if connection is valid
 */
export const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return false;
    }
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration verification failed:', error);
    return false;
  }
};

/**
 * Sends an email using the configured SMTP service
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML email body
 * @param {string} options.text - Plain text email body
 * @param {string} [options.replyTo] - Reply-to email address
 * @returns {Promise<Object>} - { success: boolean, messageId?: string, message?: string }
 */
export const sendEmail = async ({ to, subject, html, text, replyTo }) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      return { 
        success: false, 
        message: 'Email service not configured' 
      };
    }
    
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@nomadexpressgroup.com';
    const fromName = process.env.SMTP_FROM_NAME || 'Nomad Express Group';
    
    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
      // Set reply-to to allow direct replies to the user
      replyTo: replyTo || fromEmail,
      // Add headers for better email deliverability
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
      },
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    return { 
      success: true, 
      messageId: info.messageId 
    };
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

/**
 * Escapes HTML to prevent XSS in email templates
 * @param {string} text - Text to escape
 * @returns {string} - Escaped HTML
 */
const escapeHtml = (text) => {
  if (typeof text !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};

/**
 * Sends a contact form submission email
 * @param {Object} formData - Sanitized form data
 * @param {string} formData.name - User's name
 * @param {string} formData.email - User's email
 * @param {string} [formData.phone] - User's phone (optional)
 * @param {string} formData.subject - Message subject
 * @param {string} formData.message - Message content
 * @returns {Promise<Object>} - Email send result
 */
export const sendContactFormEmail = async (formData) => {
  const { name, email, phone, subject, message } = formData;
  
  // Escape all user input to prevent XSS in email
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : 'Not provided';
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);
  
  const emailSubject = `Contact Form: ${safeSubject}`;
  const recipientEmail = process.env.HR_EMAIL;
  
  if (!recipientEmail) {
    throw new Error('HR_EMAIL environment variable is not configured');
  }
  
  // Plain text version
  const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}

---
This email was sent from the Nomad Express Group contact form.
You can reply directly to this email to respond to ${name} at ${email}.
  `.trim();
  
  // HTML version with proper escaping
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 30px;">
        <h2 style="color: #c3002e; border-bottom: 2px solid #c3002e; padding-bottom: 10px; margin-top: 0;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 8px 0;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #c3002e; text-decoration: none;">${safeEmail}</a></p>
          <p style="margin: 8px 0;"><strong>Phone:</strong> ${safePhone}</p>
          <p style="margin: 8px 0;"><strong>Subject:</strong> ${safeSubject}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #c3002e; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
          <p style="margin: 4px 0;">This email was sent from the Nomad Express Group contact form.</p>
          <p style="margin: 4px 0;">You can reply directly to this email to respond to ${safeName} at ${safeEmail}.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return await sendEmail({
    to: recipientEmail,
    subject: emailSubject,
    text: emailText,
    html: emailHtml,
    // Set reply-to to the user's email so you can reply directly
    replyTo: email,
  });
};

/**
 * Sends a quote request form submission email
 * @param {Object} formData - Sanitized form data
 * @param {string} formData.name - Customer's name
 * @param {string} formData.email - Customer's email
 * @param {string} [formData.companyName] - Company name (optional)
 * @param {string} formData.phone - Customer's phone
 * @param {string} formData.freightType - Type of freight
 * @param {string} formData.pickupLocation - Pickup location
 * @param {string} formData.deliveryLocation - Delivery location
 * @param {string} [formData.weight] - Weight (optional)
 * @param {string} [formData.dimensions] - Dimensions (optional)
 * @param {string} [formData.pickupDate] - Preferred pickup date (optional)
 * @param {string} [formData.notes] - Special requirements/notes (optional)
 * @returns {Promise<Object>} - Email send result
 */
export const sendQuoteFormEmail = async (formData) => {
  const { name, email, companyName, phone, freightType, pickupLocation, deliveryLocation, weight, dimensions, pickupDate, notes } = formData;
  
  // Escape all user input to prevent XSS in email
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompanyName = companyName ? escapeHtml(companyName) : 'Not provided';
  const safePhone = escapeHtml(phone);
  const safeFreightType = escapeHtml(freightType);
  const safePickupLocation = escapeHtml(pickupLocation);
  const safeDeliveryLocation = escapeHtml(deliveryLocation);
  const safeWeight = weight ? escapeHtml(weight) : 'Not provided';
  const safeDimensions = dimensions ? escapeHtml(dimensions) : 'Not provided';
  const safePickupDate = pickupDate ? escapeHtml(pickupDate) : 'Not specified';
  const safeNotes = notes ? escapeHtml(notes) : 'None';
  
  const emailSubject = `New Quote Request: ${safeFreightType} - ${safePickupLocation} to ${safeDeliveryLocation}`;
  const recipientEmail = process.env.QUOTE_EMAIL;
  
  if (!recipientEmail) {
    throw new Error('QUOTE_EMAIL environment variable is not configured');
  }
  
  // Plain text version
  const emailText = `
New Quote Request

Contact Information:
Name: ${name}
Email: ${email}
Company: ${companyName || 'Not provided'}
Phone: ${phone}

Shipping Details:
Freight Type: ${freightType}
Pickup Location: ${pickupLocation}
Delivery Location: ${deliveryLocation}
Weight: ${weight || 'Not provided'}
Dimensions: ${dimensions || 'Not provided'}
Preferred Pickup Date: ${pickupDate || 'Not specified'}

Special Requirements / Notes:
${notes || 'None'}

---
This email was sent from the Nomad Express Group quote request form.
You can reply directly to this email to respond to ${name} at ${email}.
  `.trim();
  
  // HTML version with proper escaping
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 30px;">
        <h2 style="color: #c3002e; border-bottom: 2px solid #c3002e; padding-bottom: 10px; margin-top: 0;">
          New Quote Request
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Contact Information</h3>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #c3002e; text-decoration: none;">${safeEmail}</a></p>
          <p style="margin: 8px 0;"><strong>Company:</strong> ${safeCompanyName}</p>
          <p style="margin: 8px 0;"><strong>Phone:</strong> ${safePhone}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #c3002e; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Shipping Details</h3>
          <p style="margin: 8px 0;"><strong>Freight Type:</strong> ${safeFreightType}</p>
          <p style="margin: 8px 0;"><strong>Pickup Location:</strong> ${safePickupLocation}</p>
          <p style="margin: 8px 0;"><strong>Delivery Location:</strong> ${safeDeliveryLocation}</p>
          <p style="margin: 8px 0;"><strong>Weight:</strong> ${safeWeight}</p>
          <p style="margin: 8px 0;"><strong>Dimensions:</strong> ${safeDimensions}</p>
          <p style="margin: 8px 0;"><strong>Preferred Pickup Date:</strong> ${safePickupDate}</p>
        </div>
        
        ${notes ? `
        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #c3002e; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Special Requirements / Notes:</h3>
          <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${safeNotes}</p>
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
          <p style="margin: 4px 0;">This email was sent from the Nomad Express Group quote request form.</p>
          <p style="margin: 4px 0;">You can reply directly to this email to respond to ${safeName} at ${safeEmail}.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return await sendEmail({
    to: recipientEmail,
    subject: emailSubject,
    text: emailText,
    html: emailHtml,
    // Set reply-to to the user's email so you can reply directly
    replyTo: email,
  });
};

/**
 * Sends a driver application form submission email
 * @param {Object} formData - Sanitized form data
 * @param {string} formData.firstName - Driver's first name
 * @param {string} formData.lastName - Driver's last name
 * @param {string} formData.email - Driver's email
 * @param {string} formData.phone - Driver's phone
 * @param {string} formData.city - Driver's city
 * @param {string} formData.state - Driver's state
 * @param {string} formData.cdlClass - CDL class
 * @param {string} formData.yearsExperience - Years of experience
 * @param {Array<string>} formData.endorsements - CDL endorsements
 * @param {boolean} formData.hasTWIC - Has TWIC card
 * @param {string} [formData.message] - Additional message
 * @returns {Promise<Object>} - Email send result
 */
export const sendApplicationFormEmail = async (formData) => {
  const { firstName, lastName, email, phone, city, state, cdlClass, yearsExperience, endorsements, hasTWIC, message } = formData;
  
  // Escape all user input to prevent XSS in email
  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeCity = escapeHtml(city);
  const safeState = escapeHtml(state);
  const safeCdlClass = cdlClass ? escapeHtml(cdlClass) : 'Non-CDL';
  const safeYearsExperience = escapeHtml(yearsExperience);
  const safeEndorsements = endorsements && endorsements.length > 0 ? endorsements.map(e => escapeHtml(e)).join(', ') : 'None';
  const safeHasTWIC = hasTWIC ? 'Yes' : 'No';
  const safeMessage = message ? escapeHtml(message) : 'None';
  
  const fullName = `${firstName} ${lastName}`;
  const safeFullName = `${safeFirstName} ${safeLastName}`;
  
  const emailSubject = `New Driver Application: ${safeFullName} - ${safeCdlClass}`;
  const recipientEmail = process.env.HR_EMAIL;
  
  if (!recipientEmail) {
    throw new Error('HR_EMAIL environment variable is not configured');
  }
  
  // Plain text version
  const emailText = `
New Driver Application

Personal Information:
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Location: ${city}, ${state}

Licensing & Qualifications:
CDL Class: ${cdlClass}
Years of Experience: ${yearsExperience}
Endorsements: ${safeEndorsements}
TWIC Card: ${safeHasTWIC}

Additional Details:
${message || 'None'}

---
This email was sent from the Nomad Express Group driver application form.
You can reply directly to this email to respond to ${fullName} at ${email}.
  `.trim();
  
  // HTML version with proper escaping
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 30px;">
        <h2 style="color: #c3002e; border-bottom: 2px solid #c3002e; padding-bottom: 10px; margin-top: 0;">
          New Driver Application
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Personal Information</h3>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${safeFullName}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #c3002e; text-decoration: none;">${safeEmail}</a></p>
          <p style="margin: 8px 0;"><strong>Phone:</strong> ${safePhone}</p>
          <p style="margin: 8px 0;"><strong>Location:</strong> ${safeCity}, ${safeState}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #c3002e; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Licensing & Qualifications</h3>
          <p style="margin: 8px 0;"><strong>CDL Class:</strong> ${safeCdlClass}</p>
          <p style="margin: 8px 0;"><strong>Years of Experience:</strong> ${safeYearsExperience}</p>
          <p style="margin: 8px 0;"><strong>Endorsements:</strong> ${safeEndorsements}</p>
          <p style="margin: 8px 0;"><strong>TWIC Card:</strong> ${safeHasTWIC}</p>
        </div>
        
        ${message ? `
        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #c3002e; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Additional Details:</h3>
          <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
          <p style="margin: 4px 0;">This email was sent from the Nomad Express Group driver application form.</p>
          <p style="margin: 4px 0;">You can reply directly to this email to respond to ${safeFullName} at ${safeEmail}.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return await sendEmail({
    to: recipientEmail,
    subject: emailSubject,
    text: emailText,
    html: emailHtml,
    // Set reply-to to the applicant's email so you can reply directly
    replyTo: email,
  });
};

