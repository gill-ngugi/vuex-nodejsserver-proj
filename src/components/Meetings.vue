<template>
    <div>
        <!-- NAV-MENU -->
        <div class = "nav-menu" style="height:45px; width:100%; padding:0px; padding-top:0.3%; text-align:center;">
            <router-link to="/dashboard" style="text-decoration:none;"><v-icon color="#fff" size="35" style="margin-left:10px;">mdi-home</v-icon></router-link>
                <v-spacer></v-spacer>
            <p style="font-weight:bold; font-size:24px;">Meetings</p>
                <v-spacer></v-spacer>
            <v-icon color="#ffffff" style="margin-right:20px;">mdi-refresh</v-icon>
        </div>

        <!-- COMPONENT -->
        <div class="component">
            <div class="left">
                <table style="color:rgb(86,182,229); margin-top:10px; margin-left:10px;">
                    <tr>
                        <td><v-icon size="30" style="color:rgb(86,182,229)">mdi-briefcase</v-icon></td>
                        <td style="font-size:21px; padding-left:20px;">Meetings For</td>
                    </tr>
                </table>

                <div style="background-color:#fff; margin-left:3%; margin-right:3%; padding-bottom:2%;">
                    <div class="left-details" @click="swapComponent('view-01')" style="cursor:pointer; display:flex; padding:15px; border-bottom:1px solid #f3f3f3; margin:10px;">
                        <div class="left-details-left" style="display:inline;">
                            All
                        </div>
                            <div class="filler" style="flex-grow:1"></div>
                        <div class="left-details-right" style="display:inline;">
                            4
                        </div>
                    </div>
                    <div class="left-details" style="display:flex; padding:15px; border-bottom:1px solid #f3f3f3; margin:10px;">
                        <div class="left-details-left" style="display:inline;">
                            Directors
                        </div>
                            <div class="filler" style="flex-grow:1"></div>
                        <div class="left-details-right" style="display:inline;">
                            1
                        </div>
                    </div>
                    <div class="left-details" style="display:flex; padding:15px; border-bottom:1px solid #f3f3f3; margin:10px;">
                        <div class="left-details-left" style="display:inline;">
                            Audit Committee
                        </div>
                            <div class="filler" style="flex-grow:1"></div>
                        <div class="left-details-right" style="display:inline;">
                            1
                        </div>
                    </div>
                    <div class="left-details" style="display:flex; padding:15px; border-bottom:1px solid #f3f3f3; margin:10px;">
                        <div class="left-details-left" style="display:inline;">
                            HR Committee
                        </div>
                            <div class="filler" style="flex-grow:1"></div>
                        <div class="left-details-right" style="display:inline;">
                            1
                        </div>
                    </div>
                    <div class="left-details" style="display:flex; padding:15px; border-bottom:1px solid #f3f3f3; margin:10px;">
                        <div class="left-details-left" style="display:inline;">
                            Credit Committee
                        </div>
                            <div class="filler" style="flex-grow:1"></div>
                        <div class="left-details-right" style="display:inline;">
                            1
                        </div>
                    </div><div class="left-details" style="display:flex; padding:15px; border-bottom:1px solid #f3f3f3; margin:10px;">
                        <div class="left-details-left" style="display:inline;">
                            Risk Committee
                        </div>
                            <div class="filler" style="flex-grow:1"></div>
                        <div class="left-details-right" style="display:inline;">
                            0
                        </div>
                    </div>
                </div>
            </div>

            <div class="right">
                <div class="parent">
                    <div class="left-buttons">
                        All
                    </div>
                        <div class="filler"></div>
                    <div class="right-buttons">
                        <div class="dropdown-table" style="display:inline;">
                            <v-menu>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        color="primary" 
                                    
                                        text
                                        v-on="on"
                                        style="color:rgb(86,182,229);"
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
                    </div>
                    <div style="display:inline; ">
                        <button class="btn btn-lg" text v-on:click="doSort('itemName')" href="javascript:" style="padding-top:0px; color:rgb(86,182,229);">
                            Date
                        </button>
                    </div>
                </div>

                
                <!-- Components Switch -->
                    <div :is="currentComponent" :swap-component="swapComponent"></div> 
                <!-- End of components switch -->

                <div style="background-color:rgb(86,182,229); color:#fff; width:100%; padding:10px; position:absolute; bottom:0; display:flex;">
                    <div style="flex-grow:1"></div> 
                        <span><v-icon style="color:#fff;">mdi-file-pdf-outline</v-icon>
                        Matters Arising Report</span>
                    <div style="flex-grow:1"></div> 
                </div>

            </div>   
        </div>
        <!-- END OF COMPONENT --> 
    </div>
</template>

<script>
    import Vue from 'vue';

    Vue.component('travelGillian',{
        props: ['losAngeles'],
        template: `<h1>{{losAngeles}}</h1>`
    })

    Vue.component('pizzaGillian', {
        props: ['pizzaChickenMacon'],
        template: '<h1 color="purple">{{pizzaChickenMacon}}</h1>'
    })

    Vue.component('tab-home', { 
    	template: '<div>Home component</div>' 
    })
    Vue.component('tab-posts', { 
        template: '<div>Posts component</div>' 
    })
    Vue.component('tab-archive', { 
        template: '<div>Archive component</div>' 
    })

    var View01 = {
        props: ['swapComponent'],
        template: `
            <div style="width:98%; margin:1%; background-color:#fff; border:1px solid #f2f2f2; height:auto; border-left:5px solid #27ae60; display:flex; padding:1%; padding-bottom:0px;"> 
            <!-- <div style="cursor:pointer; width:98%; margin:1%; background-color:#fff; border:1px solid #f2f2f2; height:auto; border-left:5px solid #27ae60; display:flex; padding:1%; padding-bottom:0px;"> -->
                <span @click="swapComponent('view-02')" style="display:inline; cursor:pointer;">
                    <p style="font-size:19px;">Board Meeting</p>
                    <p style="color:grey;">Board Room::West Point::Nairobi</p>
                    <p style="color:grey;"><span style="color:green; font-weight:bold;">Upcoming</span> - 30 Jan 2020, 03:00 AM </p>
                </span>
                <span style="flex-grow:1"></span>
                <span style="display:inline">
                    <table style="margin-top:30px; font-size:17px;">
                        <tr>
                            <td style="padding-right:20px; cursor:pointer;">
                                <v-icon size="35" style="color:rgb(86,182,229);">mdi-account-group</v-icon> 
                                Participants
                            </td>
                            <td style="padding-right:20px;">
                                <v-icon size="35" style="color:rgb(86,182,229);">mdi-email</v-icon> 
                                RSVP
                            </td>
                            <td style="padding-right:20px;">
                                <v-icon size="35" style="color:rgb(86,182,229);">mdi-message-text</v-icon> 
                                RCI
                            </td>
                        </tr>
                    </table>
                </span>
            </div>
        `       
    }
    var View02 = {
        props: ['swapComponent'],
        template: `
                <!-- <div @click="swapComponent('view-01')" style="width:auto; height:auto;"> -->
                <div style="width:auto; height:auto; cursor:default;">
                    <!-- TOP -->
                    <div style="width:98%; margin:1%; background-color:#fff; border:1px solid #f2f2f2; height:auto; border-left:5px solid #27ae60; display:flex; padding:1%; padding-bottom:0px;">
                        <span style="display:inline">
                            <p style="font-size:19px;">Board Meeting</p>
                            <p style="color:grey;">Board Room::West Point::Nairobi</p>
                            <p style="color:grey;"><span style="color:green; font-weight:bold;">Upcoming</span> - 30 Jan 2020, 03:00 AM </p>
                        </span>
                        <span style="flex-grow:1"></span>
                        <span style="display:inline">
                            <table style="margin-top:30px; font-size:17px;">
                                <tr>
                                    <td style="padding-right:20px;">
                                        <v-icon size="35" style="color:rgb(86,182,229);">mdi-account-group</v-icon> 
                                        Participants
                                    </td>
                                    <td style="padding-right:20px;">
                                        <v-icon size="35" style="color:rgb(86,182,229);">mdi-email</v-icon> 
                                        RSVP
                                    </td>
                                    <td style="padding-right:20px;">
                                        <v-icon size="35" style="color:rgb(86,182,229);">mdi-message-text</v-icon> 
                                        RCI
                                    </td> 
                                </tr>
                            </table>
                        </span>
                    </div>
                    <!-- END OF TOP -->

                    <!-- LOWER -->
                    <div style="width:98%; margin:1%; background-color:#fff; border:2px solid rgb(86,182,229); font-size:16px; height:auto; border-top:0px;">
                        <div style="background-color:rgb(220,220,220); padding:7px;">Agenda</div>              
                            <div style="display:flex; background-color:rgb(247,247,247); padding:7px; padding-left:16px;">
                                <span style="display:inline;">1 Declaration of interest</span>              
                                <span style="flex-grow:1;"></span>              
                                <span style="display:inline;">
                                    <p style="margin:0px;">08:00 AM</p>
                                    <p style="margin:0px;">Chets Mukherjee</p>
                                </span>              
                            </div>        
                        <div style="cursor:pointer; margin-bottom:6px; padding:7px; padding-left:26px;">
                            <v-icon style="color:green;">mdi-file-pdf-outline</v-icon>
                            Document Name.pdf
                        </div>       

                        <div style="background-color:rgb(220,220,220); padding:7px;">Agenda</div>              
                            <div style="display:flex; background-color:rgb(247,247,247); padding:7px; padding-left:16px;">
                                <span style="display:inline;">1 Declaration of interest</span>              
                                <span style="flex-grow:1;"></span>              
                                <span style="display:inline;">
                                    <p style="margin:0px;">08:00 AM</p>
                                    <p style="margin:0px;">Chets Mukherjee</p>
                                </span>              
                            </div>        
                        <div style="cursor:pointer; margin-bottom:6px; padding:7px; padding-left:26px;">
                            <v-icon style="color:green;">mdi-file-pdf-outline</v-icon>
                            Document Name.pdf
                        </div>   

                        <div style="background-color:rgb(220,220,220); padding:7px;">Agenda</div>              
                            <div style="display:flex; background-color:rgb(247,247,247); padding:7px; padding-left:16px;">
                                <span style="display:inline;">1 Declaration of interest</span>              
                                <span style="flex-grow:1;"></span>              
                                <span style="display:inline;">
                                    <p style="margin:0px;">08:00 AM</p>
                                    <p style="margin:0px;">Chets Mukherjee</p>
                                </span>              
                            </div>        
                        <div style="cursor:pointer; margin-bottom:6px; padding:7px; padding-left:26px;">
                            <v-icon style="color:green;">mdi-file-pdf-outline</v-icon>
                            Document Name.pdf
                        </div>  
                    </div> 
                    <!-- END OF LOWER -->
                </div>
            `,
    }

    export default{
        data: () => ({
            sort: {
                field: '',
                desc: true        
            },

            currentComponent: 'view-01',

            currentTab: 'Home',
            tabs: ['Home', 'Posts', 'Archive']
        }),

        components: {
            'view-01': View01,
            'view-02': View02
        },

        computed: {
            currentTabComponent: function () {
                return 'tab-' + this.currentTab.toLowerCase()
            }
        },

        methods: {
            doSort (field) {
                if(field == this.sort.field){
                    this.sort.desc = !this.sort.desc
                }
                else{
                    this.sort.field = field;
                    this.sort.desc = true;
                }
            },

            swapComponent: function(component) {
                this.currentComponent = component;
            }
        }
    }

</script>

<style scoped>
    .nav-menu{
        margin-top: 0px; 
        background-color: rgb(86,182,229);
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
        background-color:#f8f9f9;
        border-top: 5px solid rgb(86,182,229);
    }

    .left a{
        color: #000;
        text-decoration: none;
    }

    .left a:hover{
        color: rgb(86,182,229);
    }

    .right{
        width: 79%;
        float: left;
        height: 100%;
        background-color:#f8f9f9;
        border-top: 5px solid rgb(86,182,229);
        position: relative;
    }

    .parent {
        display: flex;
        width: 100%;
        background-color:#fff;
        color: rgb(86,182,229);
    }

    .filler {
        flex-grow: 1;
    }

    .left-buttons{
        display: inline;
        font-size:22px;
        padding-left:15px;
    }
    
    .right-buttons{
        display: inline;
    }

    button:focus {
        outline: 0 !important;
        border: 0 !important;
        box-shadow: none !important;
    }
    /* TAB COMPONENTS STYLING */
    .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
    }
    .tab-button:hover {
        background: #e0e0e0;
    }
    .tab-button.active {
        background: #e0e0e0;
    }
    .tab {
        border: 1px solid #ccc;
        padding: 10px;
    }
    /* END OF TCS */

</style>
