export default {
    "BlockpageSearcher" : {
        "active": true,
        "fields": [
            {
                "desc": "Пункт продажи",
                "type": "SELECT",
                "query": "sale_point_main",
                "active": true
            },
            {
                "desc": "Эл. билет",
                "type": "BOOLEAN",
                "query": "flag_e_ticket",
                "active": true
            },
            {
                "desc": "ИПТ?",
                "type": "BOOLEAN",
                "query": "flag_ipt",
                "active": true
            },
            {
                "desc": "Возврат",
                "type": "BOOLEAN",
                "query": "flag_return",
                "active": true
            },
            {
                "desc": "Из-за того что либо название нас. пунка, либо станции",
                "type": "SELECT",
                "query": "sale_city_locale",
                "active": false
            },
            {
                "desc": "",
                "type": "SELECT",
                "query": "region",
                "active": false
            },
            {
                "desc": "Организация",
                "type": "BOOLEAN",
                "query": "flag_org_group",
                "active": true
            },
            {
                "desc": "Дальний",
                "type": "BOOLEAN",
                "query": "long_distance",
                "active": true
            },
            {
                "desc": "Ближний",
                "type": "BOOLEAN",
                "query": "suburban",
                "active": true
            },
            {
                "desc": "Отложенно",
                "type": "BOOLEAN",
                "query": "flag_deferred_payment",
                "active": true
            },
            {
                "desc": "Межнационально",
                "type": "BOOLEAN",
                "query": "flag_international",
                "active": true
            }
        ]
    }
}