const dotenv = require('dotenv');
const { notarize } = require('electron-notarize');

dotenv.config();

async function notarizing(context) {
    const { electronPlatformName, appOutDir } = context;
    if (electronPlatformName !== 'darwin') {
        return;
    }

    const appName = context.packager.appInfo.productFilename;

    console.log(`Notarizing ${appName}...`);

    try {
        await notarize({
            tool: 'notarytool',
            appBundleId: 'com.se.graduable',
            appPath: `${appOutDir}/${appName}.app`,
            appleId: process.env.APPLE_ID,
            appleIdPassword: process.env.APPLE_ID_PASSWORD,
            teamId: process.env.APPLE_TEAM_ID,
        });
        console.log('Notarization completed successfully');
    } catch (error) {
        console.error('Notarization failed:', error);
        throw error;
    }
}

module.exports = notarizing;
