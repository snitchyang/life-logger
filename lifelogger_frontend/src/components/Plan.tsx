import {Dispatch, useEffect, useState} from "react";
import {Alert} from "react-native";
import {Text, View} from "react-native";
import React from "react";
import {dataSource} from "../data/source";
import {Photo} from "../data/entities/Photo";
import {Button} from "@rneui/base";

export const Plan = () => {
    const save = async () => {
        const source = await dataSource;
        const photoRepository = source.getRepository(Photo)
        await photoRepository.clear();
        // const photo = new Photo();
        // photo.description = "desc";
        // photo.name = 'name';
        // photo.views = 123;
        // photo.isPublished = false
        // photo.filename = '';
        // await photoRepository.save(photo);
        // console.log("Photo has been saved");
        const savedPhotos = await photoRepository.find()
        console.log("All photos from the db: ", savedPhotos)
    }
    return <View style={{width: "100%", height: "100%"}}><Button onPress={async () => {
        await save();
    }}></Button></View>;
};
