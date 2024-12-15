export class DbFilterProcessor {
    static processCondition(field: string, condition: any): Record<string, any> {
        const {type, filterType, filter, filterTo, dateFrom, dateTo} = condition;
        const mongoCondition: Record<string, any> = {};

        switch (type) {
            case "contains":
                mongoCondition[field] = {$regex: filter, $options: "i"};
                break;
            case "notContains":
                mongoCondition[field] = {$not: {$regex: filter, $options: "i"}};
                break;
            case "equals":
                if (filterType === "date") {
                    mongoCondition[field] = {$eq: new Date(dateFrom)};
                    break;
                }
                mongoCondition[field] = {$eq: filter};
                break;
            case "notEqual":
                if (filterType === "date") {
                    mongoCondition[field] = {$ne: new Date(dateFrom)};
                    break;
                }
                mongoCondition[field] = {$ne: filter};
                break;
            case "startsWith":
                mongoCondition[field] = {$regex: `^${filter}`, $options: "i"};
                break;
            case "endsWith":
                mongoCondition[field] = {$regex: `${filter}$`, $options: "i"};
                break;
            case "blank":
                mongoCondition[field] = {$exists: true, $eq: ""};
                break;
            case "notBlank":
                mongoCondition[field] = {$exists: true, $ne: ""};
                break;
            case "greaterThan":
                if (filterType === "date") {
                    mongoCondition[field] = {$gt: new Date(dateFrom)};
                    break;
                }
                mongoCondition[field] = {$gt: filter};
                break;
            case "greaterThanOrEqual":
                mongoCondition[field] = {$gte: filter};
                break;
            case "lessThan":
                if (filterType === "date") {
                    mongoCondition[field] = {$lt: new Date(dateFrom)};
                    break;
                }
                mongoCondition[field] = {$lt: filter};
                break;
            case "lessThanOrEqual":
                mongoCondition[field] = {$lte: filter};
                break;
            case "inRange":
                if (filterType === "date") {
                    mongoCondition[field] = {$gte: new Date(dateFrom), $lte: new Date(dateTo)};
                    break;
                }
                mongoCondition[field] = {$gte: filter, $lte: filterTo};
                break;
            default:
                break;
        }
        return mongoCondition;
    }

    static constructMongoFilters(
        filters: Record<string, any>,
        fields: Record<string, { type: string }>
    ): Record<string, any> {
        const mongoFilters: Record<string, any> = {};

        for (const [field, filterConfig] of Object.entries(filters)) {
            // Skip fields not in the schema
            if (!fields[field]) {
                continue;
            }

            const {operator, conditions} = filterConfig;

            if (conditions && Array.isArray(conditions)) {
                const conditionsArray = conditions.map((condition: any) =>
                    DbFilterProcessor.processCondition(field, condition)
                );

                // Use $and or $or at the root level
                if (operator === "OR") {
                    mongoFilters.$or = conditionsArray.map((condition) => ({
                        ...condition,
                    }));
                } else if (operator === "AND") {
                    mongoFilters.$and = conditionsArray.map((condition) => ({
                        ...condition,
                    }));
                }
            } else {
                Object.assign(mongoFilters, DbFilterProcessor.processCondition(field, filterConfig));
            }
        }

        return mongoFilters;
    }
}
