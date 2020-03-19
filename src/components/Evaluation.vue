<template>    
    <div>
        <v-app>
        <!-- NAV-MENU -->
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; text-align:center;">           
            <router-link to="/dashboard" style="text-decoration:none;"><v-icon color="#fff" size="35" style="margin-left:10px;">mdi-home</v-icon></router-link>
            <p style="font-weight:bold; font-size:24px; margin-left:40%;">Evaluation</p>
        </div>

        <!-- COMPONENT -->
              <div style="height:850px; margin-top:0.5%; margin-bottom:0.5%; background-color:#f8f9f9; border-top:5px solid rgb(72,61,139); width:98%; margin-left:1%; margin-right:1%;">
                <div class = "parent" style="height:45px; width:100%; margin-top: 7px; background-color:#fff;">
                    <div class="left-buttons">                
                        <p style="float:left; font-weight:bold; font-size:24px; text-align:left; margin-left:10px; width:250px;">Evaluation</p>              
                    </div>
                        <div class="filler"></div>
                    <div class="right-buttons" style="display:inline;">            
                        <div class="dropdown-table" style="display:inline;">
                            <v-menu>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        color="#000" 
                                        text
                                        v-on="on"
                                    >
                                        Descending
                                        <v-icon>mdi-swap-vertical-bold</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item style="display:block;">     
                                        <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" 
                                            v-on:click="doSort('itemName')" href="javascript:">Name
                                            <span v-if="sort.field=='itemName'">({{sort.desc?'desc':'asc'}})</span>
                                        </v-list-item-title>

                                        <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" 
                                            v-on:click="doSort('itemSize')" href="javascript:">Size
                                            <span v-if="sort.field=='itemSize'">({{sort.desc?'desc':'asc'}})</span>
                                        </v-list-item-title>

                                        <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" 
                                            v-on:click="doSort('itemLastUpdatedOn')" href="javascript:">Modified On
                                            <span v-if="sort.field=='itemLastUpdatedOn'">({{sort.desc?'desc':'asc'}})</span>
                                        </v-list-item-title>

                                        <v-list-item-title style="padding: 12px; font-size:16px; cursor:pointer" 
                                            v-on:click="doSort('itemUploadedBy')" href="javascript:">Submitted By
                                            <span v-if="sort.field=='itemUploadedBy'">({{sort.desc?'desc':'asc'}})</span>
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>       
                        </div> 
                    
                        <div style="display:inline; margin-right:10px;">
                            <button style="padding:0px;" class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">Created On</button>
                        </div>
                        <div style="display:inline; margin-right:10px;">
                            <button style="padding:0px;" class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">All</button>
                        </div>
                        <div style="display:inline; margin-right:10px;">
                            <button style="padding:0px;" class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">Open</button>
                        </div>
                        <div style="display:inline; margin-right:10px;">
                            <button style="padding:0px;" class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">Ongoing</button>
                        </div>
                        <div style="display:inline; margin-right:10px;">
                            <button style="padding:0px;" class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">Completed</button>
                        </div>
                    </div> 
                </div> 

                <div  v-if="closePDF" style="position:absolute; background-color:#f5f5f5; width:98%; height:850px; padding:1%; margin-right:1%; z-index:2;">
                    <button class="btn btn-lg" v-on:click="closePDF = !closePDF;" style="background-color:red; float:right; margin-right:10px;">
                        <v-icon>mdi-close-outline</v-icon>
                    </button>              
                    <pspdfkit :pdf-url="pdf" :license-key="LICENSE_KEY" :base-url="baseUrl">
                    </pspdfkit> 
                </div>

                <div class="blackish" style="width:100%;">                    
                    <table width="100%" style="overflow-y:auto; overflow-x:auto;">
                        <tr>
                            <td>
                                <div style="width:100%;">
                                    <table style="width:100%;">
                                        <tr style="color:#fff; background-color:rgb(72,61,139);">
                                            <th style="padding:7px; width:50%; padding-left:15px;">Name</th>
                                            <th style="width:10%;">From</th> 
                                            <th style="width:10%;">To</th>
                                            <th style="width:10%;">Created On</th>
                                            <th style="width:10%;">% Done</th>
                                            <th style="width:10%;">Status</th>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="width:100%; height:650px; overflow:auto;">
                                    <table class="table-striped" style="width:100%;">
                                        <tbody>
                                            <tr v-for="(item, index) in sortedData2" :key="index">
                                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:50%; padding-left:15px;">
                                                    {{ item.evaluationName }}
                                                </td>
                                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                    {{ parseInt(item.dateStarted, 10) |  moment('DD-MMM-YYYY') }}                                 
                                                </td>
                                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                    {{ parseInt(item.dateEnding, 10) |  moment('DD-MMM-YYYY') }}                                 
                                                </td>
                                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                    {{ parseInt(item.dateCreated, 10) |  moment('DD-MMM-YYYY') }}                                 
                                                </td>
                                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:10%;">{{ item.donePercent}} {{" %"}}</td>
                                                <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                                    <v-btn color="primary">Open</v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>  
        <!-- END OF COMPONENT -->

        <!-- FOOTER -->
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; padding-left:40%;">
            <v-icon color="#fff" style="margin-right:5px;">mdi-file-pdf-outline</v-icon>
            <p style="font-weight:bold; font-size:19px;">Matters Arising Report</p>
        </div>
        </v-app>
    </div>       
</template>


<script>
    var moment = require('moment');
    import axios from 'axios';
    import UserData from './repository/UserData';
    import Vue from 'vue';
    import PSPDFKit from "pspdfkit";

    const LICENSE_KEY = "vuF0E1oK-8zmH0-rz6t6lt5x3AowOhR0kRILumR6xH5T9Ctre9Fo8gkBb404wT0dORhQliyk5XuSMMayurmNTJi4GRIuHL92DKOflXw04fv1UWthdwqHGQ0wM-E_0xTt4sk1jk9pWSkN5im3J_XmU8frGN2NYiSu-LP2BF_SFitDv9E-TSJWExDAZJVh4x3djWVg0bKVI-Pv2uS7fTh8ynEe4_7ivc-SoqEldi7evAfvas4X1EPse0VhJYWtgzhIjNs4RoXAazz4j4xPRgAQEYSL4JG6ZnT2fwCNq8uTqsnxi77aP0NvM69CmaOm_h-4yL3xCpVWV0k6HEiwO-fgn0fFQeHHRemKeXlGWnjrCBob4s1bDgjh0VWkTHRmZIbEA3jt6Ehh1VZQrlVusPOJggRF63X3sTowcQM5dPae-bHLMhdOB6pov8PKEOaWoR1pRw64NheynDAaA5elyCbP_xnG5cCuzDekt6U5K9KZ-wdc3kQFgS4kgbA1Ox1n3k2zbag_mqPkNOhzQ9AzDehO8H6W8L49hvQCQtmGAcm6nuA=";

    const pspdfkit = Vue.component('pspdfkit', {
    template: 
        `
        <div class="container" style="height:100%; width:97%;">
            <!--<button class="btn btn-lg" text v-on:click="closePDF = !closePDF;" style="color:green; ">CLOSE</button> -->               
        </div>
        `,
    name: 'pspdfkit',
    props: ['pdfUrl', 'licenseKey', 'baseUrl'],
    _instance: null,

    mounted: function mounted() {
        this.getImportedData((annotations)=>{
            try{
                this.load(JSON.parse(annotations))
            }
            catch(error){
                this.load(JSON.parse(null))
            }
        }); 
    },

    methods: {
        load: function load(annotations) {
            const that = this;
            PSPDFKit.load({
                disableWebAssemblyStreaming: true,
                pdf: this.pdfUrl,
                pdf2: "example.pdf",
                container: '.container',
                licenseKey: this.licenseKey,
                baseUrl: this.baseUrl,
                instantJSON:annotations,
            })
            .then(function (instance) {
                that.$parent.errorMsg = ''
                instance.addEventListener("annotations.didSave", async () => {
                instance.exportInstantJSON().then(function (instantJSON) {
                const form = new FormData();
                form.append("payload", JSON.stringify(instantJSON));
                form.append("document_id", UserData.getDocumentId());
                form.append("user_id", UserData.getUserId());
                form.append("company_code", UserData.getCompanyCode());

                    axios.post("https://eserver1.stl-horizon.com/pspdfkit/saveAnnotation.php", form)
                    .then(response=>{
                        console.log(response);
                    });
                });
            })
            })
            .catch(function (err) {
                PSPDFKit.unload('.container')
                that.$parent.errorMsg = err.message
            });
        },

        unload: function unload() {
            if (this._instance) {
                PSPDFKit.unload(this._instance || '.container')
                this._instance = null
            }
        },

        getImportedData: function getImportedData(annotationsCallBack) {
            const form = new FormData();
                form.append("document_id", UserData.getDocumentId());
                form.append("user_id", UserData.getUserId());
                form.append("company_code", UserData.getCompanyCode());

            axios.post('https://eserver1.stl-horizon.com/pspdfkit/importAnnotation.php', form)
                .then(response => {
                    var data = response.data;
                    if(data){
                        if(annotationsCallBack instanceof Function){
                            annotationsCallBack(data.replace(/\\"/g, '"'))
                        }
                    }
                    else{
                       if(annotationsCallBack instanceof Function){
                            annotationsCallBack(data)
                        } 
                    }
                })
            },
    },
    
    watch: {
        pdfUrl: function pdfUrl() {
            this.unload()
            this.load()
        }
    },

    beforeDestroy: function beforeDestroy() {
        this.unload()
    }
    });

    export default{
        data: () => ({
            moment: moment,
            test: true,
            getRecentDocuments: [],
            itemSubArray: [],
            itemSubArray2: [],
            itemSubArray3: [],
            evaluationList: [],

            navigationPath:[
                {
                    "itemName": "...",
                    "localUrl": "0"
                }
            ],

            parentItemId:"",

            items2: [
                { title: 'Name' },
                { title: 'Size' },
                { title: 'Modified On' },
                { title: 'Submitted By' },
            ],
         
            currentComponent: null,

            componentsArray: ['comp1', 'comp2'],

            dynamicComponent: {
                template: `<p>Wheee</p>`
            },

            sort: {
                field: '',
                desc: true        
            },

            items: [
                { id: 1, name: 'Person 1', leave: 123.45 },
                { id: 2, name: 'John Smith', leave: 13.45 },
                { id: 3, name: 'Bill Smith', leave: 23.45 },
                { id: 4, name: 'John Doe', leave: 133.53 }
            ],

            load:{
                userId: '45',
                companyCode: '010',
                accessToken: '97f914eb1ceb1867e3824f647f7e589b',
                model: 'getMeetingPackFolder',
                companyId: '2',
                itemId: '0'
            },
            userdata:{                
                rootUrl:"https://eserver1.stl-horizon.com/api_v13/frontend/web/index.php/user/create"
           },

           pdf:'example.pdf',
            LICENSE_KEY: LICENSE_KEY,
            baseUrl: '',
            errorMsg: '',

            closePDF: false,
        }),

        methods: {
            reloadPage(){
                window.location.reload();
            },        

            getEvaluationList(){
                const formData = new FormData;
                formData.append("userId", UserData.getUserId());
                formData.append("companyCode", UserData.getCompanyCode());
                formData.append("accessToken", UserData.getAccessToken());
                formData.append("model", "getEvaluationList");
                formData.append("companyId", UserData.getCompanyId());

                axios.post(UserData.getBaseUrl(), formData)
                    .then(response => {
                        this.getEvaluationList = response.data;
                        this.evaluationList = this.getEvaluationList.evaluationList;
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },


            getMeetingPackFolder(){
                let baseUrl = UserData.getBaseUrl();
                axios.post(baseUrl,this.getUserData())
                    .then(response => {         
                        this.getMeetingPackFolder = response.data;
                        this.itemSubArray = this.getMeetingPackFolder.data.itemSubArray;                    
                            this.parentUrl=baseUrl;                          
                            this.navigationPath.push({"itemName":this.getMeetingPackFolder.data.itemName,"itemId":this.parentItemId})
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            },

            getMeetingPack(item){
                if(item.hasOwnProperty("itemExtension")){
                    this.closePDF = !this.closePDF;
                    this.pdf=item.itemUrl;
                    UserData.setDocumentId(item.itemId);
                    return   
                }                   
                let baseUrl = UserData.getBaseUrl();
                axios.post(baseUrl,this.getUserData(item.itemId, item.itemParentId))
                    .then(response => {  
                        this.getMeetingPackFolder = response.data;
                        this.itemSubArray = this.getMeetingPackFolder.data.itemSubArray;                    
                            this.parentUrl=baseUrl;                            
                            this.navigationPath.push({"itemName":this.getMeetingPackFolder.data.itemName,"itemId":this.parentItemId})
                        })
                    .catch(e => {
                        console.log('Error', e);
                })
            },

            getUserData(itemId=0,parentItemId=0){
                this.parentItemId=parentItemId;
                const formData = new FormData();
                formData.append('userId', UserData.getUserId());
                formData.append('companyCode', UserData.getCompanyCode());
                formData.append('accessToken', UserData.getAccessToken());
                formData.append('model', "getMeetingPackFolder");
                formData.append('companyId', UserData.getCompanyId());
                formData.append('itemId', itemId);
                return formData;        
            },

            loadItemFromHistory(){
                let currentTop = this.navigationPath.pop();
                axios.post(UserData.getBaseUrl(), this.getUserData(currentTop.itemId))
                    .then(response => {
                        this.getSubMeetingPackFolder = response.data;
                        this.itemSubArray = this.getSubMeetingPackFolder.data.itemSubArray;   
                    })
                    .catch(e => {
                        console.log("Error", e)
                        })
            },

            joinNames(){
                return [...this.navigationPath.map((value)=>{
                    return value.itemName
                })].join("/")
            },
            
            sortBySize(){
                this.itemSubArray2.itemSize.sort(function (a,b) {
                    return a - b;
                });
            },

            doSort (field) {
                if(field == this.sort.field){
                    this.sort.desc = !this.sort.desc
                }else{
                    this.sort.field = field;
                    this.sort.desc = true;
                }
            },     
            
            openPDF: function openPDF(e) {
                this.pdf = window.URL.createObjectURL(e.target.files[0])
            },

            swapComponent: function(component) {
                this.currentComponent = component;
            } 
                     
        },

        computed: {
            sortedData2 () {
                if(!this.sort.field){
                    return this.evaluationList
                }

                return this.evaluationList.concat().sort((a,b)=>{
                    if(this.sort.desc){
                        return a[this.sort.field] > b[this.sort.field] ? -1:1        
                    }
                    else{
                        return a[this.sort.field] > b[this.sort.field] ? 1:-1                  
                    }
                })
            }
        },
      
        beforeMount(){
            this.getMeetingPackFolder();
            this.getEvaluationList();
        },

        mounted() {
            const getRecentDocuments = JSON.parse(this.$localStorage.get('getRecentDocuments'));
            
            if (getRecentDocuments) {  
                this.getRecentDocuments = getRecentDocuments;
            }
        },

        components: {
            pspdfkit: pspdfkit            
        },
    }

</script>

<style scoped>
    body { 
        margin:0;
        padding:0; 
    }

    .nav-menu{
        margin-top:0px; 
        background-color: rgb(72,61,139);
        color:#fff;
        display:flex;
    }

    .nav-menu .btn{
        background-color:rgb(72,61,139);
        border:none;
        padding:0px;    
        margin-right:15px;
        color:white;
        outline:none;
    }

    .col-left{
        align-content: center;
        z-index: -1;
    } 

    .col-left .left-menu{
        background-color: #f5f5f5 ;
        align-content: center;
        margin-bottom:10px;
        font-size:20px;
    }

    .col-right{
        float:left;
        width:73%;
        overflow:hidden;
        height: auto;
        margin-top:1%;
        position: relative;
        z-index: -1;
    }

    .col-right th{
        padding:5px;
    }

    .col-right td{
        padding: 3px;
    }

    .col-right-top{
        height:230px;
        background-color: #f5f5f5;
        margin-bottom: 15px;
        padding: 10px;
        border-top: 5px solid rgb(72,61,139);
    }

    .col-right-bottom{
        height:430px;
        background-color:#ffffff;
    }

    .col-right-bottom-left{
        background-color: #f5f5f5;
    }

    .col-right-bottom-right{
        width: 59%;
        height: 430px;
        background-color: #f5f5f5;
        float:left;
        padding:1%;
    }
    .col-right-top .btn{
        padding: 3px;
        width: 100px;
    }

    .menu-row-icon-six{
        margin:0px;
        padding:0px;
        color:rgb(72,61,139);
    }

    table.scroll {
        width: 100%; 
        border-spacing: 0;
    }

    tbody tr td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    tbody td:last-child, thead th:last-child {
        border-right: none;
    }

    button:focus {
        outline: 0 !important;
        border: 0 !important;
        box-shadow: none !important;
    }

    a{
        text-decoration: none;
        color:#000000;
    }

    a:hover{
        color:rgb(72,61,139);
    }

    .parent {
        display: flex;
        width:100%;
    }

    .filler {
        flex-grow: 1;
    }

    .left-buttons{
        display: inline;
    }
    
    .right-buttons{
        display: inline;
    }

    .user_row{
        display:flex;
    }
    .user_row>div{
        flex:1;
        text-align: center;
    }
   </style>
