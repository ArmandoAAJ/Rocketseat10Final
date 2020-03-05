import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginOut } from '~/store/modules/autenticacao/action';
import { Container, Content, Profile } from './styles';
import headerLogo from '~/assets/logo.png';

export default function Header() {
  const dispatch = useDispatch();

  function handleLoginOut() {
    dispatch(loginOut());
  }

  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={headerLogo} alt="Logo Header" />
          <NavLink to="/dashboard" activeClassName="nav-color">
            ENCOMENDAS
          </NavLink>
          <NavLink to="/entregador" activeClassName="nav-color">
            ENTREGADORES
          </NavLink>
          <NavLink to="/destinatario" activeClassName="nav-color">
            DESTINATÁRIOS
          </NavLink>
          <NavLink to="/problemas" activeClassName="nav-color">
            PROBLEMAS
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <NavLink to="/" onClick={handleLoginOut}>
                Sair do Sistema
              </NavLink>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
