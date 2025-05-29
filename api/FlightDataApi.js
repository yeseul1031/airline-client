export async function getFlight(filterBy = {}) {
  const queryParams = new URLSearchParams(filterBy).toString();
  const url = `http://localhost:4999/flight?${queryParams}`;

  console.log('Calling getFlight with filter:', filterBy); // 검색 조건 확인
  console.log('Constructed URL:', url); // URL 확인

  try {
    const response = await fetch(url);
    console.log('Response status:', response.status); // 응답 상태 코드 확인
    if (!response.ok) {
      throw new Error(`Failed to fetch flights: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched flight data:', data); // 반환된 데이터 확인
    return data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    return [];
  }
}