/* Static demo: answers the page's /api calls from pre-recorded results, so no backend is needed.
   The results are real outputs of the prototype for the five demo examples (see scripts/build_static_demo.py). */
(function () {
  window.DEMO_STATIC = true;
  const realFetch = window.fetch.bind(window);
  let DATA = null;
  const PDFS = {'invoice_R06.pdf': 'JVBERi0xLjMKJeLjz9MKMSAwIG9iago8PAovUHJvZHVjZXIgKFF1aWNrQm9va3MgT25saW5lKQovVGl0bGUgKEludm9pY2UgMjAyNlwwNTUwOSkKL0NyZWF0b3IgKFF1aWNrQm9va3MpCi9DcmVhdGlvbkRhdGUgKERcMDcyMjAyNjA5MzAwOTAwMDBcMDU1MDZcMDQ3MDBcMDQ3KQovTW9kRGF0ZSAoRFwwNzIyMDI2MDkzMDA5MDAwMFwwNTUwNlwwNDcwMFwwNDcpCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovQ291bnQgMQovS2lkcyBbIDQgMCBSIF0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDIgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9Db250ZW50cyA1IDAgUgovTWVkaWFCb3ggWyAwIDAgNjEyIDc5MiBdCi9SZXNvdXJjZXMgPDwKL0ZvbnQgNiAwIFIKL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4KL1JvdGF0ZSAwCi9UcmFucyA8PAo+PgovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXQovTGVuZ3RoIDY5NQo+PgpzdHJlYW0KR2F0VTA5bG5jOydZTzBBbSVIKmJQSVFjbDNIZj00JzF1ay8uQ0ZfIjAuJ19XUXJqXihTPEFBX0E+XlRJOid1VjBqKEw6SHA/ZlIpO1w4aSRjJE5Ja1VELj9aLjRAUEUjN1w8R2tuUFEwOzAxKCFMcUA6XVtyYiFRIXQ6UVYuV0ZyYlF1JT1YWGxpVTxqIyVJO10+Tl5tO08iJnE8NmAnU1V1LjxLZmVWPEAlQz03NGBDdGw8UjUlJFMoPFYjYl5BWHMjOUlZWTJvcDZeSEgoZ01OJEgoN2lxQWw6YS00U0A2UCtLP1s7Q0xvVVU3MkNzLjNYQkRXUWkhYVNNbSpkKlUzXSQ0VkMxZm9AKiRPKy9UajwlWU0sQ2tdYDJDZUZUR2RwIkBLV1dnL2wrZEUjZ05LbWFTWD43KFNZb0FeKmJlLnVfZikwLFdtZGVDaykwOEYpSiFYNV1jT14nR0ZvWTkndW5aR25Ocmhkbk0uMFhUXW1DTCRPQVo9dUFZIlxocnBadWtmcTRMX0UoPWZMTjktXmswWShiM0QoQXVSXXBDclNiIyg5Q3Q/czIyTW4hUCEvXChHLF9DTHFbLldtTVQ6Lik6LFhTLytacEM3OURabUhkRFlwQjRBb3A6U0o6NCNjKXJJYWhMTFdXUSFULGE5OSZdIm9AYjY5TU9ZYURFUmpnVk5TUyNQdUNHW1pfWksvT2BRZTI7NmQ7PTRQcUpbXTVEUHMlKyZFW2ksK29Tb2NPUXIvYmQjYTFOcVNpT3JvRkwkXiJZYzVIJUYvciZEdWRoYSFBNkNicz1YOyNaPFBeKFRJY1grNFZmdCVhOytLa3FpViJsPlBJIkZJYj0hI0FVZClibV1HKTEzcVBwazZcPVdybSsqLTZDNFFORkl1IjFHSzhuUlZOOW9GJ18mQTd0fj4KZW5kc3RyZWFtCmVuZG9iago2IDAgb2JqCjw8Ci9GMSA3IDAgUgovRjIgOCAwIFIKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL05hbWUgL0YxCi9TdWJ0eXBlIC9UeXBlMQovVHlwZSAvRm9udAo+PgplbmRvYmoKOCAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9OYW1lIC9GMgovU3VidHlwZSAvVHlwZTEKL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCnhyZWYKMCA5CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMjE1IDAwMDAwIG4gCjAwMDAwMDAyNzQgMDAwMDAgbiAKMDAwMDAwMDMyMyAwMDAwMCBuIAowMDAwMDAwNTEyIDAwMDAwIG4gCjAwMDAwMDEyOTggMDAwMDAgbiAKMDAwMDAwMTMzOSAwMDAwMCBuIAowMDAwMDAxNDQ2IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgOQovUm9vdCAzIDAgUgovSW5mbyAxIDAgUgo+PgpzdGFydHhyZWYKMTU1OAolJUVPRgo=', 'invoice_R10.pdf': 'JVBERi0xLjMKJeLjz9MKMSAwIG9iago8PAovUHJvZHVjZXIgKEFkb2JlIFBob3Rvc2hvcCAyNVwwNTYwKQovVGl0bGUgKEludm9pY2UgMjAyNlwwNTUwOCkKL0NyZWF0b3IgKEFkb2JlIFBob3Rvc2hvcCkKL0NyZWF0aW9uRGF0ZSAoRFwwNzIyMDI2MDgxNTEwMDAwMFwwNTUwNFwwNDcwMFwwNDcpCi9Nb2REYXRlIChEXDA3MjIwMjYxMDAyMTU0NTAwXDA1NTA0XDA0NzAwXDA0NykKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9Db3VudCAxCi9LaWRzIFsgNCAwIFIgXQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0NvbnRlbnRzIDUgMCBSCi9NZWRpYUJveCBbIDAgMCA2MTIgNzkyIF0KL1Jlc291cmNlcyA8PAovRm9udCA2IDAgUgovUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PgovUm90YXRlIDAKL1RyYW5zIDw8Cj4+Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMiAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0ZpbHRlciBbIC9BU0NJSTg1RGVjb2RlIC9GbGF0ZURlY29kZSBdCi9MZW5ndGggNjk1Cj4+CnN0cmVhbQpHYXRVMD8jUTJkJ1JmR1IzIk1TMDorPFJbLURZUS84XzdXbWcoKF4takZtZklBSE5wJ2FjcTk+QG9BVjBPRExBSS83Yjt1NS1EKGA2MWRbbF0kLF1KJkVkKy9QVGJEWUZZIWRWJUFyKkhmazRdZ2hJZXBeRkEnQ2klJTQ5QEUmKyJpMDVPNzVmaTxQVWUsLUVNJmNROE9oVkRYIXBUN0FJP1AxImo4W1hwL1hYMVNNTS45KD5mPEoxUCFjXENZJjYxMTAhNE9eYmBQVWFvOShDaj5iLlBYTk5lbFpoJjs5NXU2JjhjTFRbYFhoS1hyZCJLbkwkNl0uS1QoWF9sYkBsN2hAPkMoXGQtLEw+TUVtcTJSKyw5Jk1ubHFTMVs+Li1CPiZLPyknSG5DUFkwX1E+bG1NWVErLDw4LCdmY3EkMWZDV1lmLjw0bFlFXm9rcz1uXk9JKXJyaDEvc0EsR1A1YzttWS0zMktsX2lFN1BidWlkLW8lJldTOiY1NldmS1lsMzgvVD9JK1w0XkxpUVdELyFcMmddK1soTS9iaFZLSEo2PmVKZmFNT0A5KU1McElrdFIvVSFaKy5UXF5BZ2olOW1QQ1tmJHIxc1x1QzVmXmApLEBwclEtOWZZWUcrX0EhXC5CMSFFLG1ecEVcTjBwSFZFZC9gYDkvb0pCZCpvWWYzS2FPcWEvXzg0WShsXGxhPlRSJ0w2Nzs2Kmo3aSdNPkhwZHBwVFwhTFpuOTckOWJjdHVOW0ZmIUdWNyQ9YShiTjRiSj9WZSdgSkhnTi81P14kZ202RnI0Jm1fITdbLiJdY1UyQDFuIldUKEVpI0JnSmFcR0E5bGVraEVPNy9IOUxMMz5iQE9adS9nL2A+Zkg/NTFKTEhUTFNAaGdUNVovZkpmLD5ka2g3Ii5pNTYubic+XnV+PgplbmRzdHJlYW0KZW5kb2JqCjYgMCBvYmoKPDwKL0YxIDcgMCBSCi9GMiA4IDAgUgo+PgplbmRvYmoKNyAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovTmFtZSAvRjEKL1N1YnR5cGUgL1R5cGUxCi9UeXBlIC9Gb250Cj4+CmVuZG9iago4IDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGQKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL05hbWUgL0YyCi9TdWJ0eXBlIC9UeXBlMQovVHlwZSAvRm9udAo+PgplbmRvYmoKeHJlZgowIDkKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAyMjYgMDAwMDAgbiAKMDAwMDAwMDI4NSAwMDAwMCBuIAowMDAwMDAwMzM0IDAwMDAwIG4gCjAwMDAwMDA1MjMgMDAwMDAgbiAKMDAwMDAwMTMwOSAwMDAwMCBuIAowMDAwMDAxMzUwIDAwMDAwIG4gCjAwMDAwMDE0NTcgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA5Ci9Sb290IDMgMCBSCi9JbmZvIDEgMCBSCj4+CnN0YXJ0eHJlZgoxNTY5CiUlRU9GCg=='};
  const blobUrl = b64 => URL.createObjectURL(new Blob([Uint8Array.from(atob(b64), c => c.charCodeAt(0))], {type: 'application/pdf'}));
  const load = () => DATA ? Promise.resolve(DATA) : realFetch('data.json').then(r => r.text()).then(t => {
    for (const [name, b64] of Object.entries(PDFS)) t = t.split(name).join(blobUrl(b64));
    return (DATA = JSON.parse(t));
  });
  const json = (obj, status = 200) => new Response(JSON.stringify(obj), {status, headers: {'Content-Type': 'application/json'}});
  const STEPS = ['Federal registry, website, domain, map, web search', 'Provincial registry', 'Map lookup of the registered address',
    'Sanctions, procurement and public lists', 'Court and insolvency links', "Earlier applications and the bank's fraud list", 'Applying the 42 rules'];
  const jobs = {}, DECISIONS = [];
  const keyOf = app => (app.case_id || '').toUpperCase() ||
    Object.entries(DATA.names).find(([n]) => n === (app.legal_name || '').trim().toUpperCase())?.[1] || '';

  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input.url;
    if (!url.startsWith('/api/')) return realFetch(input, init);
    const path = url.split('?')[0], method = ((init || {}).method || 'GET').toUpperCase();
    await load();
    if (path === '/api/health') return json({status: 'ok'});
    if (path === '/api/cases') return json(Object.entries(DATA.cases).map(([id, c]) => ({case_id: id, label: c.label, expect: ''})));
    if (path.startsWith('/api/case/')) {
      const c = DATA.cases[decodeURIComponent(path.slice(10)).toUpperCase()];
      return c ? json(c) : json({detail: 'This demo has the five prepared examples only.'}, 404);
    }
    if (path === '/api/check' && method === 'POST') {
      const body = JSON.parse(init.body), key = keyOf(body.application || {});
      if (!key || !DATA.checks[key]) return json({error: 'This demo has five prepared examples. Click one of them in the Try an example box, then press Check now.'}, 404);
      const t0 = Date.now(); jobs[body.job] = t0;
      await new Promise(r => setTimeout(r, 5200));
      return json(JSON.parse(JSON.stringify(DATA.checks[key])));
    }
    if (path.startsWith('/api/progress/')) {
      const t0 = jobs[path.slice(14)] || Date.now(), n = Math.min(STEPS.length, Math.floor((Date.now() - t0) / 700));
      return json({steps: STEPS.map((s, i) => ({step: s, state: i < n ? 'done' : 'running'})).slice(0, Math.min(STEPS.length, n + 1))});
    }
    if (path === '/api/manual') return json({ok: true});
    if (path === '/api/decision' && method === 'POST') {
      const d = JSON.parse(init.body), at = new Date().toISOString().slice(0, 19);
      DECISIONS.unshift({...d, recorded_at: at, sampled_for_qa: false});
      return json({ok: true, recorded_at: at, sampled_for_qa: false});
    }
    if (path === '/api/audit') return json(DECISIONS);
    if (path === '/api/summary') return json({error: 'Not available in the demo.'}, 400);
    return json({detail: 'Not available in this demo.'}, 404);
  };
})();
