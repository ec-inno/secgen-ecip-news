import getInitiatives from '../utils/getInitiatives';

export const handler = async () => {
  try {
    const initiatives = await getInitiatives();

    return {
      statusCode: 200,
      body: JSON.stringify({ initiatives }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
