export function exportCSV(data: any[], filename: string) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(
        obj => Object.values(obj).map(val =>
            `"${String(val).replace(/"/g, '""')}"`
        ).join(',')
    );

    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
};