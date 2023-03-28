<script>
import { getObjectsList } from '@/services//objects';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
export default {
    name: 'ObjectsPage',
    data() {
        return {
            objectsList: [],
        };
    },
    components: {
        DataTable,
        Column,
        Button,
    },
    methods: {
        getObjectsList() {
            getObjectsList().then(res => {
                this.objectsList = res;
            });
        },
    },
    mounted() {
        this.getObjectsList();
    },
}
</script>