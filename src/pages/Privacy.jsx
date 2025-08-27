import React from 'react';

const Privacy = () => (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h1>Privacy Policy</h1>
        <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use LibConnect.
        </p>
        <h2>Information We Collect</h2>
        <ul>
            <li>Personal information you provide (such as name, email address, etc.)</li>
            <li>Usage data and analytics</li>
            <li>Cookies and similar technologies</li>
        </ul>
        <h2>How We Use Your Information</h2>
        <ul>
            <li>To provide and improve our services</li>
            <li>To communicate with you</li>
            <li>To ensure security and prevent fraud</li>
        </ul>
        <h2>Information Sharing</h2>
        <p>
            We do not sell or share your personal information with third parties except as required by law or to provide our services.
        </p>
        <h2>Your Choices</h2>
        <ul>
            <li>You can update or delete your account information at any time.</li>
            <li>You may opt out of certain communications.</li>
        </ul>
        <h2>Contact Us</h2>
        <p>
            If you have any questions about this Privacy Policy, please contact us at support@libconnect.com.
        </p>
        <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '2rem' }}>
            Last updated: June 2025
        </p>
        {/* Designed by */}
        <p style={{ fontSize: '0.8rem', color: '#ccc', marginTop: '2rem', textAlign: 'center' }}>
            &copy; 2025 LibConnect. All rights reserved. <br />
            Powered by <a href="https://riseup-liberia.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'underline' }}>SoftRise Group of Companies</a>.

        </p>
    </div>
);

export default Privacy;