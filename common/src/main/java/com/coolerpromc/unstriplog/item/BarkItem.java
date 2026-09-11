package com.coolerpromc.unstriplog.item;

import com.coolerpromc.unstriplog.component.ModDataComponents;
import net.minecraft.network.chat.Component;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;

public class BarkItem extends Item {

    public BarkItem(Properties properties) {
        super(properties);
    }

    @Override
    public Component getName(ItemStack itemStack) {
        if (itemStack.has(ModDataComponents.BARK_TYPE.get())){
            return Component.translatable("item.unstriplog." + itemStack.get(ModDataComponents.BARK_TYPE.get()).name() + "_bark");
        }
        return super.getName(itemStack);
    }
}
