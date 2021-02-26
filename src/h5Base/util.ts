export const fetchSchema =  async function() {
  const data = await window.fetch('http://localhost:7001/api/page/getSchema?id=603369e21ed1f229deec54b4');
  const res = await data.json();
  console.log('result: ', res.data.pageSchema);
};