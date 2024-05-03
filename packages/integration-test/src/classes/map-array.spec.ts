import { classes } from '@automapper/classes';
import { afterMap, afterMapArray, createMap, createMapper, forMember, ignore, mapFrom } from '@automapper/core';
import { SimpleUserDto } from './dtos/simple-user.dto';
import { SimpleUser } from './models/simple-user';

describe('Map Array Classes', () => {
    const mapper = createMapper({ strategyInitializer: classes() });

    afterEach(() => {
        mapper.dispose();
    });

    it('should map', () => {
        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                mapFrom((s) => s.firstName + ' ' + s.lastName)
            )
        );

        const user = new SimpleUser('Chau', 'Tran');

        const dto = mapper.map(user, SimpleUser, SimpleUserDto);
        expect(dto.fullName).toEqual('Chau Tran');
    });

    // afterMap

    it('should map with afterMap', () => {
        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                ignore()
            ),
            afterMap((s, d) => {
                d.fullName = s.firstName + ' ' + s.lastName;
            })
        );

        const user = new SimpleUser('Chau', 'Tran');

        const dto = mapper.map(user, SimpleUser, SimpleUserDto);
        expect(dto.fullName).toEqual('Chau Tran');
    });

    it('should not map array async with afterMap', async () => {
        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                ignore()
            ),
            afterMap(async (s, d) => {
                d.fullName = s.firstName + ' ' + s.lastName;
            })
        );

        const user = new SimpleUser('Chau', 'Tran');

        const dtos = await mapper.mapArrayAsync([user], SimpleUser, SimpleUserDto);

        expect(dtos.length).toEqual(1);
        expect(dtos[0].fullName).toEqual(undefined); // not mapped on mapArrayAsync
    });

    // afterMapArray

    it('should map with afterMapArray', () => {
        createMap(
            mapper,
            SimpleUser,
            SimpleUserDto,
            forMember(
                (d) => d.fullName,
                ignore()
            ),
            afterMapArray((sources, destinations) => {
                destinations.forEach((destination, index) => {
                    const source = sources[index];
                    destination.fullName = source.firstName + ' ' + source.lastName;
                });
            })
        );

        const user = new SimpleUser('Chau', 'Tran');

        const dtos = mapper.mapArray([user], SimpleUser, SimpleUserDto);

        expect(dtos.length).toEqual(1);
        expect(dtos[0].fullName).toEqual('Chau Tran');
    });

    // it('should map async with afterMapArray', async () => {
    //     createMap(
    //         mapper,
    //         SimpleUser,
    //         SimpleUserDto,
    //         forMember(
    //             (d) => d.fullName,
    //             ignore()
    //         ),
    //         afterMapArray(async (sources, destinations) => {
    //             await Promise.all(
    //                 destinations.map(async (destination, index) => {
    //                     const source = sources[index];
    //                     destination.fullName = await asyncResolve(source.firstName + ' ' + source.lastName);
    //                 })
    //             );
    //         })
    //     );

    //     const user = new SimpleUser('Chau', 'Tran');

    //     const dtos = await mapper.mapArrayAsync([user], SimpleUser, SimpleUserDto);

    //     expect(dtos.length).toEqual(1);
    //     expect(dtos[0].fullName).toEqual('Chau Tran');
    // });
});
