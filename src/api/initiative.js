import getInitiative from '../utils/getInitiative';

export const handler = async event => {
  try {
    const { year, number } = event.queryStringParameters;

    const initiative = await getInitiative({ year, number });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ initiative }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
