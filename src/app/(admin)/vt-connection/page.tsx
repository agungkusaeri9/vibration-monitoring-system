import Breadcrumb from "@/components/common/Breadcrumb";
import VTConnectionList from "@/components/pages/vt-connection/VtConnection";

export default function VtConnectionPage() {
    return (

        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Vt Connection', href: '/vt-connection' }]} />
            <VTConnectionList />
        </div>
    );
}
