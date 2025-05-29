import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getFlight } from '../api/FlightDataApi';
import FlightList from './component/FlightList';
import LoadingIndicator from './component/LoadingIndicator';
import Search from './component/Search';
import Debug from './component/Debug';

export default function Main() {
  const [condition, setCondition] = useState({});
  const [flightList, setFlightList] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = (newCondition) => {
    setCondition(newCondition); // 검색 조건 업데이트
  };

  // 테스트에서 global.search를 호출하기 때문에 이를 정의합니다.
  useEffect(() => {
    global.search = search;
    return () => {
      delete global.search; // 컴포넌트가 언마운트될 때 global.search를 제거합니다.
    };
  }, []);

  // condition 상태가 변경될 때마다 getFlight 호출
  useEffect(() => {
    console.log('Condition changed:', condition); // condition 상태 변경 확인
    if (Object.keys(condition).length > 0) { // condition이 비어있지 않을 때만 호출
      setLoading(true); // 로딩 상태 활성화
      getFlight(condition)
        .then((data) => {
          console.log('Flight data fetched:', data); // 가져온 데이터 확인
          setFlightList(data); // API 결과로 flightList 업데이트
        })
        .catch((error) => console.error('Error fetching flights:', error)) // 에러 처리
        .finally(() => setLoading(false)); // 로딩 상태 비활성화
    }
  }, [condition]); // condition 상태 변경을 감지

  return (
    <div>
      <Head>
        <title>Airline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>여행가고 싶을 땐, Airline</h1>
        <Search onSearch={search} />
        {loading ? (
          <LoadingIndicator />
        ) : (
          <div className="table">
            <div className="row-header">
              <div className="col">출발</div>
              <div className="col">도착</div>
              <div className="col">출발 시각</div>
              <div className="col">도착 시각</div>
              <div className="col"></div>
            </div>
            <FlightList list={flightList} />
          </div>
        )}
        <div className="debug-area">
          <Debug condition={condition} />
        </div>
      </main>
    </div>
  );
}