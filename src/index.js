import Fingerprint2 from "fingerprintjs2";
import localforage from "localforage";

(async () => {
  try {
    const fingerprint = await new Promise(resolve =>
      new Fingerprint2().get(f => resolve(f))
    );
    localforage.config({
      name: fingerprint,
      version: 1.0,
      size: 4980736,
      storeName: fingerprint
    });

    let visits = await localforage.getItem("visits");
    visits = visits ? visits + 1 : 1;
    await localforage.setItem("visits", visits);
    console.log(visits);
    document.getElementById("app").innerHTML = `
      <h1>hello:</h1>
      <div>${fingerprint}</div>
      <div>visits: ${visits}</div>
    `;
  } catch (e) {
    console.error(e);
  }
})();
