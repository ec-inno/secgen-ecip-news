import getInitiatives from '../utils/getInitiatives';

export const handler = async () => {
  try {
    const initiatives = await getInitiatives();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ initiatives }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
