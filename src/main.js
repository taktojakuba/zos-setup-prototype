
async function run(scriptName) {
  try {
    const result = await window.electronAPI.runScript('./scripts/' + scriptName);
  } catch (err) {
    console.error(err);
  }
}