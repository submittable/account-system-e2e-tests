import 'dotenv/config';

const getEnvVar = (varName, isRequired = true) => {
  if (!process.env[varName])
  {
    console.error(`Environment variable ${varName} not found!`);
    
    // only exit when env var is required
    if (isRequired) {
      process.exit(1);
    }
  }

  return process.env[varName];
}

export { getEnvVar }