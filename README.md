# Email Sender Chrome Extension

## Overview

The Email Sender is a Chrome extension that simplifies the process of sending personalized emails with attached resumes using dynamic templates. It integrates a Node.js backend to handle email sending through the Nodemailer package, allowing users to manage and send emails efficiently.

## Features

- Automated email generation using dynamic templates
- Simplified process to reduce manual effort
- Custom email template creation and management
- Integration with Gmail for sending emails

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Email Service**: Nodemailer
- **Storage**: Browser's Local Storage
- **Testing**: Postman

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version >= 14.x)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd email-sender
```

### Step 2: Set Up the Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the required packages:

   ```bash
   npm install express nodemailer multer cors dotenv
   ```

3. Create a `.env` file in the backend directory with the following content:

   ```plaintext
   EMAIL=your_email_id
   PASSWORD=your_app_password_here
   FILE_NAME=your_name_Resume.pdf
   ```

   **Note**: For two-factor authentication (2FA) in your Google account, go to [App Passwords](https://support.google.com/accounts/answer/185201) and create an app password. Use this password in the `.env` file.

4. Start the backend server:

   ```bash
   node index.js
   ```

   The server will run on `http://localhost:3300`.

### Step 3: Set Up the Frontend (Chrome Extension)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Create a `manifest.json` file with the following content:

   ```json
   {
     "manifest_version": 3,
     "name": "Email Sender",
     "version": "1.0",
     "action": {
       "default_popup": "popup.html"
     },
     "icons": {
       "16": "email.png",
       "48": "email.png",
       "128": "email.png"
     },
     "permissions": ["storage", "activeTab"],
     "background": {
       "service_worker": "background.js"
     },
     "options_page": "settings.html"
   }
   ```

3. Load the Chrome extension:

   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" (toggle in the top right).
   - Click on "Load unpacked" and select the `frontend` directory.

## Usage

- Open the extension from the Chrome toolbar.
- Fill in the required fields (email, name, position, company, resume).
- Click "Send Email" to send your personalized email with the attached resume.

## Contribution

Feel free to contribute to the project by submitting issues or pull requests. 

## License

This project is licensed under the MIT License [LICENSE](https://github.com/rush181200/easy_mail_chrome_extension/blob/main/LICENSE) .

## Contact

For any inquiries or feedback, please reach out via email.
