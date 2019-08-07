import axios from 'axios';

const getInitiative = async ({
  endpoint = 'https://ec.europa.eu/citizens-initiative/services/initiative',
  year,
  number,
} = {}) => {
  if (year && number) {
    const result = await axios.get(`${endpoint}/details/${year}/${number}`);

    return result.data.initiative;
  }

  return {};
};

export default getInitiative;
