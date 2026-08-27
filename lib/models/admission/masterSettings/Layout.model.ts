// Import
import mongoose from 'mongoose';





// Layout Schema
const LayoutSchema = new mongoose.Schema(
    {

        // Session
        session:{type:String, required:true},


        // Report setting
        report_setting:{
            report_name:{type:String, required:true},
            report_title:{type:String, required:true}
        },

        // Header and footer setting
        header_and_footer_setting:{
            is_header_enable:{type:Boolean},
            is_header_line_enable:{type:Boolean},
            is_footer_enable:{type:Boolean},
            is_footer_line_enable:{type:Boolean},
            is_logo_enable:{type:Boolean},
            is_row_no:{type:Boolean},
            is_group:{type:Boolean},
            is_sum:{type:Boolean}
        },

        // Font size setting
        font_size_setting:{
            font_size:{type:Number, required:true},
            is_total:{type:String}
        },

        // Page prientation and layout setting
        page_orientation_and_layout_setting:{
            page_orientation:{type:String},
            page_layout:{type:String}
        },

        // Height and width setting
        height_and_width_setting:{
            page_width:{type:Number, required:true},
            page_height:{type:Number, required:true},
            footer_height:{type:Number, required:true},
            header_height:{type:Number, required:true},
            header_line_width:{type:Number, required:true},
            logo_height:{type:Number, required:true},
            column_width:{type:Number, required:true},
            footer_line_height:{type:Number, required:true},
            table_column_height:{type:Number, required:true}
        },

        // Margin setting
        margin_setting:{
            page_margin_right:{type:Number, required:true},
            page_margin_left:{type:Number, required:true},
            page_margin_bottom:{type:Number, required:true},
            page_margin_top:{type:Number, required:true},
            logo_margin_left:{type:Number, required:true},
            logo_margin_top:{type:Number, required:true},
            table_margin_left:{type:Number, required:true},
            table_margin_top:{type:Number, required:true},
            footer_line_margin_top:{type:Number, required:true},
            header_line_margin_top:{type:Number, required:true}
        }
    },
    {
        timestamps:true
    }
);





// Export
const Layout = (mongoose.models.Layout || mongoose.model('Layout', LayoutSchema)) as mongoose.Model<any>;
export default Layout;