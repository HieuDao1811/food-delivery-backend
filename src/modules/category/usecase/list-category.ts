import { IQueryHandler } from "../../../shared/interface";
import { ICategoryRepository, ListQuery } from "../interface";
import { Category } from "../model/model";

export class ListCategoryQueryHandler implements IQueryHandler<ListQuery, Array<Category>> {
  constructor(private readonly repository: ICategoryRepository) {}

  async query(query: ListQuery): Promise<Category[]> {
    const categories = await this.repository.listAll();
    const childrenByParentId = new Map<string, Category[]>();

    for (const category of categories) {
      if (!category.parentId) {
        continue;
      }

      const children = childrenByParentId.get(category.parentId) ?? [];
      children.push(category);
      childrenByParentId.set(category.parentId, children);
    }

    const requestedParentId = query.cond.parentId ?? null;
    let roots = categories.filter(category => category.parentId === requestedParentId);

    if (query.cond.name) {
      roots = roots.filter(category => category.name === query.cond.name);
    }

    query.paging.total = roots.length;

    const start = (query.paging.page - 1) * query.paging.limit;
    const pagedRoots = roots.slice(start, start + query.paging.limit);

    const buildTree = (category: Category, ancestors: Set<string>): Category => {
      if (ancestors.has(category.id)) {
        return { ...category, children: [] };
      }

      const nextAncestors = new Set(ancestors).add(category.id);
      const children = childrenByParentId.get(category.id) ?? [];

      return {
        ...category,
        children: children.map(child => buildTree(child, nextAncestors))
      };
    };

    return pagedRoots.map(category => buildTree(category, new Set()));
  }
}
