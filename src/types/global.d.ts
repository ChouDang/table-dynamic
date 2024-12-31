type TableModel = {
    id: string;
    fields: {
        name: string;
        taskName?: string;
        isDone?: boolean;
    }[]
};

type TableCol = string

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type Option = {
    value: string,
    label: string
}
