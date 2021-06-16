import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'
import { json } from 'express';

new Vue({
    el: '#app',
    data(){
        return {
            form: {
                name: '',
                value: '',
            },
            contacts: []
        }
    },
    methods: {
        createContact(){
            const {...contact} = this.form;
            this.contacts.push({...contact, id: Date.now(), marked: false});
            this.form.name = this.form.value = '';
        },
        markContact(id){
            const contact = this.contacts.find(c => c.id === id)
            contact.marked = true;
        },
        removeContact(id){
            this.contacts = this.contacts.filter(c => c.id !== id);
        }
    },
    async mounted(){
        const data  = await request('/api/contacts');
        this.contacts = data;
    }
})

async function request(url, method = 'GET', data = null){
    try{
        const headers = {};
        let body;
        if (data){
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        const resp = await fetch(url, {
            method,
            headers,
            body,
        })
        return await resp.json();
    }
    catch(e){
        console.log('Error: ', e.message);
    }
}