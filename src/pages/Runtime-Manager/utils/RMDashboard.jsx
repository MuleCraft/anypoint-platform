const RuntimeDashboardSection = [
    {
        items: [
            { name: 'Dashboard', label: 'Dashboard', path: `/cloudhub/sandbox/home/applications/${name}?option=Sandbox` },
            { name: 'Diagnostic', label: 'Diagnostic', path: `/cloudhub/sandbox/home/applications?option=Sandbox&name=${name}` },
            { name: 'Logs', label: 'Logs', path: `/cloudhub/sandbox/home/applications?option=Sandbox&name=${name}` },
            { name: 'Object Store', label: 'Object Store', path: `/cloudhub/sandbox/home/applications?option=Sandbox&name=${name}` },
            { name: 'Schedules', label: 'Schedules', path: `/cloudhub/sandbox/home/applications?option=Sandbox&name=${name}` },
            { name: 'Settings', label: 'Settings', path: `/cloudhub/sandbox/home/applications?option=Sandbox&name=${name}` },
        ],
    },
];

export default RuntimeDashboardSection;
