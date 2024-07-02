import 'dotenv/config';

const getEnvVar = (varName) => {
  if (!process.env[varName])
  {
    console.error(`Environment variable ${varName} not found!`);
    process.exit(1);
  }

  return process.env[varName];
}

export { getEnvVar }