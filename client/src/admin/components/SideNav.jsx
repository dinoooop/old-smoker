import SideNavButton from './SideNavButton';

export default function () {

    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Projects" icon="fa-solid fa-circle-check" href="/admin/projects" />
                <SideNavButton title="Post" icon="fa-solid fa-circle-check" href="/admin/posts" />
            </ul>
        </div >
    );
}
