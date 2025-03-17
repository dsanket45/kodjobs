const config = {
    development: {
        apiUrl: 'https://api.sampleapis.com'
    },
    production: {
        apiUrl: 'https://api.sampleapis.com'
    }
};

const environment = window.location.hostname === 'localhost' ? 'development' : 'production';
const currentConfig = config[environment];

export default currentConfig; 