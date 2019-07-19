import axios from 'axios';

const getInitiatives = async (
  endpoint = 'https://ec.europa.eu/citizens-initiative/services/initiative'
) => {
  // Get all each time to display numbers.
  const results = await axios.get(`${endpoint}/get/all`);

  const initiatives = await Promise.all(
    results.data.initiative.map(async basic => {
      const year = basic['@year'];
      const number = basic['@number'];

      if (year && number) {
        const result = await axios.get(`${endpoint}/details/${year}/${number}`);
        const { initiative: additional } = result.data;

        return {
          year,
          number,
          ...basic,
          ...additional,
        };
      }

      return basic;
    })
  );

  return initiatives;
};

export default getInitiatives;
