
async function run(scriptName) {
  try {
    const result = await window.electronAPI.runScript(scriptName);
  } catch (err) {
    console.error(err);
  }
}