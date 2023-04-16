const { createApp } = Vue

    createApp({
        data() {
            return {
                addtitle:'',
                oldtitle:'',
                compelet:'',
                type:'All',

                todos:[
                    {id: 0, title: '睡覺', compelet: true, editing: false},
                    {id: 1, title: '吃吃', compelet: false, editing: false},
                ],
            }
        },

        methods:{
// 新增todo
            addtodo(){

                if(this.addtitle){
                    let id = this.todos.length
                    let title = this.addtitle
                    let arr = {id, title, compelet:false}
                    this.todos.push(arr)
                    this.addtitle=''
                }
                
            },
// 刪除
            canceltodo(index){
                this.todos.splice(index,1)
            },
            
// ***修改
            editer(todo,index){ 
                this.oldtitle = todo.title
                todo.editing = !todo.editing
            // $nextTick 為 DOM更新的 hook
                this.$nextTick(()=>{
            // $refs 訪問 dom 組件
                    this.$refs[`${todo}`][0].focus()
                })

                if(!todo.title){
                    this.canceltodo(index)
                }
            },

// 退出修改
            quitediter(todo){
                todo.title = this.oldtitle
                todo.editing = !todo.editing
            },

        },
        

        computed:{
// 篩選
            filters(){
                if(this.type == 'All'){
                    return this.todos
                }else if(this.type == 'Active'){
                    return this.todos.filter(todo => !todo.compelet)
                }else{
                    return this.todos.filter(todo => todo.compelet)
                }
            },

// 未完成數字            
            uncompeletnum(){
                return this.todos.filter(todo => !todo.compelet).length
            }
        },
        
    }).mount('#app')