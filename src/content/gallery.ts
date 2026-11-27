/**
 * Gallery 지구본에 찍히는 장소.
 *
 * 추가하는 법: 아래 `places` 배열에 장소를 하나 더 넣어요. 순서대로 장소 칩과 자동 이동이 돌아가요.
 * 지금 있는 항목은 모두 [대괄호] 자리 표시라서, 실제 장소로 바꾸거나 지우면 돼요.
 * 배열이 비면 지구본만 보이고 "아직 올린 사진이 없어요"가 떠요.
 *
 * - lat, lng: 위도·경도. 구글 지도에서 장소를 오른쪽 클릭하면 맨 위에 나오는 숫자 두 개예요.
 * - work: true면 💼(일하러 간 곳), false면 📷 핀이에요.
 * - photo: public 폴더 기준 대표 사진 경로 (예: /images/gallery/tokyo.jpg). 없으면 색 칸.
 * - hue: 사진이 없을 때 칸 색 (blue, green, redorange, violet, orange, pink, lightblue)
 */
export type PlaceHue = "blue" | "green" | "redorange" | "violet" | "orange" | "pink" | "lightblue";

export interface Place {
  name: string;
  country: string;
  lat: number;
  lng: number;
  /** 화면에 보이는 날짜 */
  date: string;
  /** 사진 장수 */
  count: string;
  work: boolean;
  photo?: string;
  hue: PlaceHue;
}

export const places: Place[] = [
  {
    name: "[서울]",
    country: "[대한민국]",
    lat: 37.57,
    lng: 126.98,
    date: "[2025]",
    count: "[24]",
    work: true,
    hue: "blue",
  },
  {
    name: "[포항]",
    country: "[대한민국]",
    lat: 36.02,
    lng: 129.34,
    date: "[2023.08]",
    count: "[12]",
    work: true,
    hue: "green",
  },
  {
    name: "[부산]",
    country: "[대한민국]",
    lat: 35.18,
    lng: 129.07,
    date: "[2024.05]",
    count: "[18]",
    work: true,
    hue: "redorange",
  },
  {
    name: "[대전]",
    country: "[대한민국]",
    lat: 36.35,
    lng: 127.38,
    date: "[2024.07]",
    count: "[9]",
    work: true,
    hue: "violet",
  },
  {
    name: "[도쿄]",
    country: "[일본]",
    lat: 35.68,
    lng: 139.69,
    date: "[2024.12]",
    count: "[30]",
    work: false,
    hue: "orange",
  },
  {
    name: "[타이베이]",
    country: "[대만]",
    lat: 25.03,
    lng: 121.56,
    date: "[2023.02]",
    count: "[15]",
    work: false,
    hue: "pink",
  },
  {
    name: "[파리]",
    country: "[프랑스]",
    lat: 48.86,
    lng: 2.35,
    date: "[2022.09]",
    count: "[41]",
    work: false,
    hue: "lightblue",
  },
  {
    name: "[뉴욕]",
    country: "[미국]",
    lat: 40.71,
    lng: -74.0,
    date: "[2025.10]",
    count: "[27]",
    work: false,
    hue: "green",
  },
  {
    name: "[시드니]",
    country: "[호주]",
    lat: -33.87,
    lng: 151.21,
    date: "[2021.01]",
    count: "[19]",
    work: false,
    hue: "redorange",
  },
];
