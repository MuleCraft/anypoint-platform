import Nav from "../../../../components/NavbarHome";
import { DashboardMain } from "../../../../components/Runtime-Manager/Sandbox/Dashboard/DashboardMain";
export default function SandboxDashboard({ name, pathValue }) {

    return (
        <div className="home">
            <Nav name={name} pathValue={pathValue} />
            <div className="Wrapper">
                <DashboardMain name={name} />
            </div>
        </div>
    );
}