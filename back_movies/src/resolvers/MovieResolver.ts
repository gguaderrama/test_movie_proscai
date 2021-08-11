import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";
import { Movie } from "../entity/Movie";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  year: number;

  @Field()
  image: string;

  @Field(() => Int)
  score: number;
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Int, { nullable: true })
  score?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(@Arg("options", () => MovieInput) options: MovieInput) {
    const movie = await Movie.create(options).save();
    return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
  ) {
    await Movie.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg("id", () => Int) id: number) {
    await Movie.delete({ id });
    return true;
  }

  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }
}
