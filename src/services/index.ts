const DATA_URL = 'https://raw.githubusercontent.com/dusixx/data/refs/heads/main/owid-co2-data.json';

export async function fetchData(): Promise<void> {
  const response = await fetch(DATA_URL, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data: unknown = await response.json();
  console.log(data);
}
