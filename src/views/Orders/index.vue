<script>
import { getOrdersList } from '@/services//orders';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
export default {
    name: 'OrdersPage',
    data() {
        return {
            ordersList: [],
        };
    },
    components: {
        DataTable,
        Column,
        Button,
    },
    methods: {
        getOrdersList() {
            getOrdersList().then(res => {
                this.ordersList = res;
            });
        },
    },
    mounted() {
        this.getOrdersList();
    },
}
</script>