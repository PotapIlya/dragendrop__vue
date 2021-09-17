export default {
    "BlockpageSearcher" : {
        "active": true,
        "fields": [
            {
                "desc": "Пункт продажи",
                "type": "SELECT",
                "query": "sale_point_main",
                "active": true,
                "width": 1
            },
            {
                "desc": "Эл. билет",
                "type": "BOOLEAN",
                "query": "flag_e_ticket",
                "active": true,
                "width": 1
            },
            {
                "desc": "ИПТ?",
                "type": "BOOLEAN",
                "query": "flag_ipt",
                "active": true,
                "width": 1
            },
            {
                "desc": "Возврат",
                "type": "BOOLEAN",
                "query": "flag_return",
                "active": true,
                "width": 1
            },
            {
                "desc": "Из-за того что либо название нас. пунка, либо станции",
                "type": "SELECT",
                "query": "sale_city_locale",
                "active": false,
                "width": 1
            },
            {
                "desc": "",
                "type": "SELECT",
                "query": "region",
                "active": false,
                "width": 1
            },
            {
                "desc": "Организация",
                "type": "BOOLEAN",
                "query": "flag_org_group",
                "active": true,
                "width": 1
            },
            {
                "desc": "Дальний",
                "type": "BOOLEAN",
                "query": "long_distance",
                "active": true,
                "width": 1
            },
            {
                "desc": "Ближний",
                "type": "BOOLEAN",
                "query": "suburban",
                "active": true,
                "width": 1
            },
            {
                "desc": "Отложенно",
                "type": "BOOLEAN",
                "query": "flag_deferred_payment",
                "active": true,
                "width": 1
            },
            {
                "desc": "Межнационально",
                "type": "BOOLEAN",
                "query": "flag_international",
                "active": true,
                "width": 1
            }
        ]
    }
}