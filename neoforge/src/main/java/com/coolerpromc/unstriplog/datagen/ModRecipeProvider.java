package com.coolerpromc.unstriplog.datagen;

import com.coolerpromc.unstriplog.item.ModItems;
import net.minecraft.advancements.Advancement;
import net.minecraft.data.recipes.RecipeCategory;
import net.minecraft.data.recipes.RecipeProvider;
import net.minecraft.data.recipes.ShapedRecipeBuilder;
import net.minecraft.data.worldgen.BootstrapContext;
import net.minecraft.world.item.Items;
import net.minecraft.world.item.crafting.Recipe;

public class ModRecipeProvider extends RecipeProvider {
    protected ModRecipeProvider(BootstrapContext<Recipe<?>> recipeOutput, BootstrapContext<Advancement> advancementOutput) {
        super(recipeOutput, advancementOutput);
    }

    @Override
    protected void buildRecipes() {
        ShapedRecipeBuilder.shaped(items, RecipeCategory.MISC, Items.PAPER, 1)
                .pattern("##")
                .define('#', ModItems.BARK)
                .unlockedBy(getHasName(ModItems.BARK), has(ModItems.BARK))
                .save(output, "paper_from_bark");
    }
}
