import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

import './Layout.scss';

const Layout = () => {
  return (
    <div className="home">
      <Sidebar />
      <Header />
      <div className="home__container">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod commodi omnis laudantium
        culpa maiores mollitia suscipit tempora ut id deserunt quibusdam est perferendis eligendi
        animi debitis alias nisi nesciunt, eaque corporis. Aliquam adipisci vero sapiente repellat
        nisi eveniet nostrum ex voluptatem, consectetur magni at voluptate animi? Similique dolores,
        nihil eaque sunt corporis rem reprehenderit repudiandae distinctio, ducimus at pariatur
        doloribus illo atque temporibus animi soluta, ad totam laboriosam repellendus. Eos corrupti
        iure nobis impedit voluptatibus dolore veritatis voluptates facere ab nisi sapiente aliquam
        possimus dolorum eaque in animi recusandae placeat ratione, nostrum ducimus delectus quasi
        fugiat illum aspernatur. Tempora, neque?
      </div>
    </div>
  );
};

export default Layout;
