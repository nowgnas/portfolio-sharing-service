import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { UserStateContext, DispatchContext } from '../App';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem('userToken');
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: 'LOGOUT' });
    // 기본 페이지로 돌아감.
    navigate('/');
  };

  return (
    <div>
      <h1 className="mainPageTitle text-align-center">PORTFOLIO</h1>
      <Nav
        className="justify-content-around mt-3 mb-2"
        activeKey={location.pathname}
      >
        {isLogin && (
          <>
            <Nav.Item className="rightNav">
              <Nav.Link onClick={() => navigate('/')}>MY PAGE</Nav.Link>
            </Nav.Item>
            <Nav.Item className="rightNav">
              <Nav.Link onClick={() => navigate('/network')}>NETWORK</Nav.Link>
            </Nav.Item>
            <Nav.Item className="rightNav">
              <Nav.Link onClick={logout}>LOGOUT</Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </div>
  );
}

export default Header;
