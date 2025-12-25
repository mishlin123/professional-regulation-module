# Professional Regulation Module - Usage Guide

## How to Run Locally

1.  **Open your terminal**.
2.  Navigate to the project folder:
    ```bash
    cd /Users/hamishlindsay/Desktop/tester/professional-regulation-module
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
4.  Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.

---

## How to Share with a Friend (Public URL)

To allow a friend to access the site running on your computer from their own device, you can use a tunneling service.

### Option A: Using LocalTunnel (Quick & Temporary)
This creates a temporary public URL that forwards to your local computer. **You must keep your `npm run dev` terminal open for this to work.**

1.  **Start your app** (if not already running):
    ```bash
    npm run dev
    ```
2.  **Open a NEW terminal window/tab**.
3.  Run the following command:
    ```bash
    npx localtunnel --port 5173
    ```
4.  Copy the URL it gives you (e.g., `https://wild-goose-42.loca.lt`) and send it to your friend.
5.  **Important**: When they open the link, they might see a warning page. They need to click "Click to Continue" or enter the tunnel password if prompted (LocalTunnel sometimes requires this).

### Option B: Deploy to the Web (Better Way)
For a more permanent link that works even when your computer is off, use **Netlify Drop**.

1.  Run the build command to create the final files:
    ```bash
    npm run build
    ```
    (This creates a `dist` folder in your project).
2.  Go to [Netlify Drop](https://app.netlify.com/drop).
3.  Drag and drop the `dist` folder from your project into the browser window.
4.  Netlify will give you a permanent URL (like `https://jovial-elion-12345.netlify.app`) that you can share with anyone.
