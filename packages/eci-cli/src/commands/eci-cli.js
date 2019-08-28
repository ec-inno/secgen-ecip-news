module.exports = {
  name: 'eci-cli',
  run: async toolbox => {
    const { printHelp } = toolbox.print;
    printHelp(toolbox);
  },
};
