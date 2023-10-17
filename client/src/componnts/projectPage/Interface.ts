export interface Data {
    _id: string;
    name: string;
    status: string;
    situation: string;
    users: string;
    topUser: string;
    projectDescription: string;
    projectTeam: UpdateProjectData
    projectClient: string;
}

export interface UpdateProjectData extends Array<Record<string, string>> { }


export interface ChipsProps {
    data: UpdateProjectData
    onData: Function
}

export interface ChipData extends Record<string, string> { }


export interface ModalProps {
    onClose: Function;
    data: any;
    nameInput: string | undefined;
    typeModal: string;
}

export interface ModalForm {
    item: string;
    projectTeam: UpdateProjectData
}
