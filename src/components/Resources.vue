<template>
    <div>
        <v-app>
        <!-- NAV-MENU -->
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; text-align:center;">
            <router-link to="/dashboard" style="text-decoration:none;"><v-icon color="#fff" size="35" style="margin-left:10px;">mdi-home</v-icon></router-link>
            <p style="font-weight:bold; font-size:24px; margin-left:40%;">Resources</p>
        </div>

        <!-- COMPONENT -->
        <div class="component">
            <div class="left" style="color:#000000;">
                <div class="left-top">        
                    <v-list style="background-color:#f8f9f9;">
                        <v-list-item-title style="color:rgb(227,58,58); padding:15px;">
                            <v-icon style="margin-right:10px;" color="rgb(227,58,58)">mdi-server</v-icon>
                            Dynamic Resources
                        </v-list-item-title>
                        <v-list-item
                            v-for="(item, index) in itemSubArrayDynamicData.itemSubArray"
                            :key="index"                                
                        >
                        <v-list-item-title><a href="#" v-on:click="loadDirectoriesAndFiles(item)">{{item.itemName}}</a> <v-divider></v-divider></v-list-item-title>  
                        </v-list-item>
                    </v-list>
                </div>

                <div class="left-bottom">
                    <v-list style="background-color:#f8f9f9;">
                        <v-list-item-title style="color:rgb(227,58,58); padding:15px;">
                            <v-icon style="margin-right:10px;" color="rgb(227,58,58)">mdi-server</v-icon>
                            Static Resources
                        </v-list-item-title>
                        <v-list-item
                            v-for="(item, index) in itemSubArrayStaticData.itemSubArray"
                            :key="index"                                
                        >
                        <v-list-item-title><a href="#" v-on:click="loadDirectoriesAndFiles(item)"> {{item.itemName}} </a> <v-divider></v-divider></v-list-item-title>  
                        </v-list-item>
                    </v-list>
                </div>
            </div>

            <div class="right">
                <!-- Header 1 -->
                <div class = "parent" style="height:45px; width:100%; background-color:#fff;">
                    <div class="left-buttons">                
                        <router-link to=""><v-icon v-on:click="loadItemFromHistory()" style="float:left; margin-top:5px; margin-left:10px; background-color:rgb(227,58,58); color:#fff" size="30">mdi-chevron-left</v-icon></router-link> 
                        <p style="float:left; font-weight:bold; font-size:24px; text-align:left; margin-left:10px; width:250px;">Resources</p>              
                    </div>
                        <div class="filler"></div>
                            <div class="right-buttons" style="display:inline;"> 
                                <div class="dropdown-table" style="display:inline;">
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="primary" 
                                        
                                            text
                                            v-on="on"
                                        >
                                            Ascending
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

                                            <v-list-item-title style="padding:12px; font-size:16px; cursor:pointer" 
                                                v-on:click="doSort('itemUploadedBy')" href="javascript:">Submitted By
                                                <span v-if="sort.field=='itemUploadedBy'">({{sort.desc?'desc':'asc'}})</span>
                                            </v-list-item-title>

                                        </v-list-item>
                                    </v-list>
                                </v-menu>       
                            </div> 
                        
                        <div style="display:inline;">
                            <button class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:">
                                Name
                            </button>
                        </div>
                    </div> 
                </div> 

               
            
            <!-- Header 2 -->
                <div class = "parent" style="height:55px; width:100%; background-color:#f1f1f1;">
                    <p style="font-weight:bold; font-size:24px; margin-left:10px; float:left;">{{joinNames()}}</p>            
                </div>

            <!-- Table -->
                <table style="width:100%;">
                    <tr>
                        <td>
                            <table style="width:100%;">
                                <tr style="background-color:rgb(227,58,58); color:#fff;">
                                    <th style="padding:7px; width:5%;">No.</th>
                                    <th style="width:5%;"></th>
                                    <th style="width:60%;">Name</th>
                                    <th style="width:10%;">Size</th>
                                    <th style="width:10%;">Modified On</th>
                                    <th style="width:10%;">Submitted By</th>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table class="table-striped" style="width:100%;">  
                                <tbody>
                                    <tr v-for="(item, index) in sortedData2" :key="index" style="width:100%;">
                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:7px; width:5%;">{{ index + 1 + "." }}</td>
                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:5%;">    
                                            <span class="input-group-addon">
                                                <v-icon v-if="item.itemExtension" color="rgb(227,58,58)" style="margin-right:5px;">mdi-file-pdf-outline</v-icon>
                                                <v-icon v-else color="rgb(227,58,58)" style="margin-right:5px;">mdi-folder-open</v-icon>
                                            </span>
                                        </td>
                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:60%;">
                                            <a href="#"  v-on:click="getResources(item)">
                                                {{ item.itemName }}
                                            </a>
                                        </td>
                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                            {{ item.itemSize | prettyBytes }} 
                                        </td>
                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                            {{ parseInt(item.itemLastUpdatedOn, 10) |  moment('DD-MMM-YYYY') }}                                 
                                        </td>
                                        <td style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; width:10%;">
                                            {{ item.itemUploadedBy }}                                 
                                        </td>
                                    </tr>
                                </tbody>                              
                            </table>
                        </td>
                    </tr>
                </table>
            </div>

             <div v-if="closePDF" style="position:absolute; background-color:#f5f5f5; width:100%; height:100%; padding:1%; overflow:hidden; margin-right:0; ">
                    <button class="btn btn-lg" v-on:click="closePDF = !closePDF;" style="background-color:red; float:right; margin-right:10px;">
                        <v-icon>mdi-close-outline</v-icon>
                    </button>               
                    <pspdfkit :pdf-url="pdf" :license-key="LICENSE_KEY" :base-url="baseUrl">
                    </pspdfkit>
                </div>
        </div>
        <!-- END OF COMPONENT -->
        </v-app>
    </div>
</template>

<script>
    var moment = require('moment');
    import axios from 'axios';
    import UserData from '../components/repository/UserData'
    import Vue from 'vue';
    import PSPDFKit from "pspdfkit";

    // const LICENSE_KEY = "vuF0E1oK-8zmH0-rz6t6lt5x3AowOhR0kRILumR6xH5T9Ctre9Fo8gkBb404wT0dORhQliyk5XuSMMayurmNTJi4GRIuHL92DKOflXw04fv1UWthdwqHGQ0wM-E_0xTt4sk1jk9pWSkN5im3J_XmU8frGN2NYiSu-LP2BF_SFitDv9E-TSJWExDAZJVh4x3djWVg0bKVI-Pv2uS7fTh8ynEe4_7ivc-SoqEldi7evAfvas4X1EPse0VhJYWtgzhIjNs4RoXAazz4j4xPRgAQEYSL4JG6ZnT2fwCNq8uTqsnxi77aP0NvM69CmaOm_h-4yL3xCpVWV0k6HEiwO-fgn0fFQeHHRemKeXlGWnjrCBob4s1bDgjh0VWkTHRmZIbEA3jt6Ehh1VZQrlVusPOJggRF63X3sTowcQM5dPae-bHLMhdOB6pov8PKEOaWoR1pRw64NheynDAaA5elyCbP_xnG5cCuzDekt6U5K9KZ-wdc3kQFgS4kgbA1Ox1n3k2zbag_mqPkNOhzQ9AzDehO8H6W8L49hvQCQtmGAcm6nuA=";
    const LICENSE_KEY = "Ni5LCTkSzrHKL3GnUlgVXV-Nt0-8cc5vbAlHmT6bRZZsheHGsPidBAsVHH7EbGm6krygVYe1_nAyLUlRZ4OUN9xBGmFpOiLJbNNvfnzJFkg3HwNvhVr0pNcug-kq6qFZMefIjdFy6-51sEWAD6nFfaRAFr0ihgzQ_Qf7o43DSWakOaAFFk6THvYiEAiwlDeTR-ggbcRf3orhW58EWXjqc8d1Ez1iy3SJtFsy0ReQcWBlkV2r_0HzjWzc1mvO4fDFSmYJvZ7DiL9MAtoEXyy14hpwaGW4uliBV6-JeCdjz64pzuEqhYql2EgzbG0r2eLGHIeDyrYtkA20c_Zyd_zbf4Vtbd31PPuPymL-75ZIcXtoIhlUcKLxMTEUcL8KiXgx7zEHWU4ajjtH2uPXNHkBnxyUL4K9OH7WxmV5k2nxAjqHLOf9bPIf0q61OJyejnmO";

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
                // that._instance = instance;
                that.$parent.errorMsg = ''
                instance.addEventListener("annotations.didSave", async () => {
                instance.exportInstantJSON().then(function (instantJSON) {
                console.log(instantJSON)
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
            itemSubArrayStaticData: [],
            itemSubArrayDynamicData: [],
            resourceDirectors: [],
            itemName: '',

            items: [
                { title: 'Name' },
                { title: 'Size' },
                { title: 'Modified On' },
                { title: 'Submitted By' },
            ],

            sort: {
                field: '',
                desc: true        
            },

            navigationPath:[
                {
                    "itemName":"...",
                    "localUrl":"0"
                }
            ],

            currentParent:"",
            parentItemId:"",

            userdata:{                
                rootUrl:"https://eserver1.stl-horizon.com/api_v13/frontend/web/index.php/user/create"
            },

            closePDF: false,
            pdf:'',
            LICENSE_KEY: LICENSE_KEY,
            baseUrl: '',
            errorMsg: '',   
        }),


        methods: {
            reloadPage(){
                window.location.reload();
            },    
            
            getResourcePackFolder(){                
                axios.post(UserData.getBaseUrl(), this.getUserData())
                    .then(response => {
                        this.getResourcePackFolder = response.data;
                        this.$localStorage.set('getResourcePackFolder', JSON.stringify(this.getResourcePackFolder));
                        this.itemSubArrayStaticData = this.getResourcePackFolder.staticData;
                        this.itemSubArrayDynamicData = this.getResourcePackFolder.dynamicData;
                    })
                    .catch(e => {
                        console.log('Error', e);
                    })
            }, 

            loadDirectoriesAndFiles(item){
                axios.post(UserData.getBaseUrl(), this.getUserData(item.itemId, item.itemParentId))
                    .then(response => {
                        this.getResourcePackFolder = response.data;
                        this.resourceDirectors = this.getResourcePackFolder.data.itemSubArray;
                        this.navigationPath = [];
                        this.navigationPath.push({
                            "itemName": this.getResourcePackFolder.data.itemName,
                            "itemId": this.itemParentId
                        });
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
                    formData.append('model', "getResourcePackFolder");
                    formData.append('companyId', UserData.getCompanyId());
                    formData.append('itemId', itemId);
                return formData;        
            },

            getResources(item){
                if(item.hasOwnProperty("itemExtension")){
                    this.closePDF = !this.closePDF;
                    this.pdf=item.itemUrl;
                    UserData.setDocumentId(item.itemId);
                    return
                }
                axios.post(UserData.getBaseUrl(), this.getUserData(item.itemId, item.itemParentId))
                    .then(response => {
                        this.getResourcePackFolder = response.data;
                        this.resourceDirectors = this.getResourcePackFolder.data.itemSubArray;
                        this.navigationPath.push({
                            "itemName": this.getResourcePackFolder.data.itemName, 
                            "itemId": this.parentItemId
                        })
                        console.log(item.itemUrl);
                    })
            },

            loadItemFromHistory(){
                let currentTop = this.navigationPath.pop();
                axios.post(UserData.getBaseUrl(), this.getUserData(currentTop.itemId))
                    .then(response =>{
                        this.getSubMeetingPackFolder = response.data;
                        this.resourceDirectors = this.getSubMeetingPackFolder.data.itemSubArray; 
                    })
            },

            joinNames(){
                return[...this.navigationPath.map((value)=>{
                    return value.itemName
                })]
                .join("/")
            },

            doSort (field) {
                if(field == this.sort.field){
                    this.sort.desc = !this.sort.desc
                }else{
                    this.sort.field = field;
                    this.sort.desc = true;
                }
            },

            swapComponent: function(component) {
                this.currentComponent = component;
            }    
           
        },

        computed: {
            sortedData2 () {
                if(!this.sort.field){
                    return this.resourceDirectors
                }
                return this.resourceDirectors.concat().sort((a,b)=>{
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
            this.getResourcePackFolder();
        },

        mounted() {
            const getResourcePackFolder = JSON.parse(this.$localStorage.get('getResourcePackFolder'));
            
            if (getResourcePackFolder) {  
                this.getResourcePackFolder = getResourcePackFolder;
            }
        },

        components: {
            pspdfkit: pspdfkit
        },
    }

</script>

<style scoped>
    .nav-menu{
        margin-top: 0px; 
        background-color: rgb(227,58,58);
        color:#fff;
        display: flex;
        margin-bottom: 1%;
    }

    .component{
        width: 99%;
        margin-left: 0.5%;
        margin-right: 0.5%;
        height: 900px;
    }

    .left{
        width: 20%;
        margin-right: 1%;
        float: left;
        height: 100%;
    }

    .left-top{
        width: 100%;
        height: 49%;
        margin-bottom: 4%;
        background-color:#f8f9f9;
        border-top: 5px solid rgb(227,58,58);
    }

    .left-bottom{
        width: 100%;
        height: 49%;
        background-color:#f8f9f9;
        border-top: 5px solid rgb(227,58,58);
    }

    .left a{
        color: #000;
        text-decoration: none;
    }

    .left a:hover{
        color: rgb(227,58,58);
    }

    .right{
        width: 79%;
        float: left;
        background-color:#f8f9f9;
        height: 100%;
        border-top: 5px solid rgb(227,58,58);
    }

    .parent {
        display: flex;
        width: 100%;
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

    button:focus {
        outline: 0 !important;
        border: 0 !important;
        box-shadow: none !important;
    }

    .table-striped a{
        text-decoration: none;
        color: #000;
    }

    .table-striped a:hover{
        color: rgb(227,58,58);
    }

</style>
