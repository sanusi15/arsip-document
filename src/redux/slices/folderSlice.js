import { createSlice } from "@reduxjs/toolkit";

const folderSlice = createSlice({
    name: 'folder',
    initialState: {
        data: {
            parentFolder: [],
            openFolder: {},
            valueContentFolder: [],
            valueContentFile: [],
            contentActive: null
        }
    },
    reducers: {
        getParentFolder: (state, action) => {
            action.payload.map((val_one) => {
                const isExists = state.data.parentFolder.find((val_two) => val_two._id == val_one._id)
                if(!isExists){
                    state.data.parentFolder.push(val_one)
                }
            })
        },
        setOpenFolder: (state, action) => {
            Object.assign(state.data.openFolder, action.payload)
        },
        setValueContentFolder: (state, action) => {
            state.data.valueContentFolder.length = 0
            action.payload.map((val_one) => {
                const isExists = state.data.valueContentFolder.find((val_two) => val_two._id == val_one._id)
                if(!isExists){
                    state.data.valueContentFolder.push(val_one)
                }
            })
        },
        setValueContentFile: (state, action) => {
            state.data.valueContentFile.length = 0
            action.payload.map((val_one) => {
                const isExists = state.data.valueContentFile.find((val_two) => val_two._id == val_one._id)
                if(!isExists){
                    state.data.valueContentFile.push(val_one)
                }
            })
        },
        setContentAcitve: (state, active) => {
            state.data.contentActive= active.payload
        }
    }
})

export const {getParentFolder, setOpenFolder, setValueContentFolder, setValueContentFile, setContentAcitve} = folderSlice.actions
export default folderSlice.reducer