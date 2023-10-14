import {atom} from 'recoil' 





const projectId = atom({
    key: 'project id', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });

  export {projectId}